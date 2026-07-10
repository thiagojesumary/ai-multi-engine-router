import httpx
from fastapi import APIRouter, HTTPException, status
from pydantic import ValidationError

from app.core.settings import get_settings
from app.providers.model_selector import ModelSelector
from app.providers.openrouter import OpenRouterProvider
from app.providers.provider_selector import ProviderSelector
from app.providers.registry import ProviderRegistry
from app.router.engine import RouterEngine
from app.schemas.request import GenerationRequest
from app.schemas.response import GenerationResponse
from app.services.generation import GenerationService

router = APIRouter(
    prefix="/v1",
    tags=["Generation"],
)


@router.post(
    "/generate",
    response_model=GenerationResponse,
    status_code=status.HTTP_200_OK,
)
async def generate(
    request: GenerationRequest,
) -> GenerationResponse:
    try:
        settings = get_settings()

        registry = ProviderRegistry(
            providers=[
                OpenRouterProvider(settings),
            ]
        )

        provider_selector = ProviderSelector(
            registry=registry,
            default_provider="openrouter",
        )

        model_selector = ModelSelector()

        router_engine = RouterEngine(
            provider_selector=provider_selector,
            model_selector=model_selector,
        )

        service = GenerationService(
            router_engine=router_engine,
            settings=settings,
        )

        return await service.generate(request)

    except ValidationError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Application configuration is invalid.",
        ) from exc

    except httpx.HTTPStatusError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=(
                f"OpenRouter returned HTTP "
                f"{exc.response.status_code}."
            ),
        ) from exc

    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Could not connect to OpenRouter.",
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Generation failed: {type(exc).__name__}.",
        ) from exc