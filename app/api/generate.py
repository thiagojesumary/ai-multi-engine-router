import httpx
from fastapi import APIRouter, HTTPException, status
from pydantic import ValidationError

from app.core.container import get_telemetry_service
from app.core.settings import get_settings
from app.providers.bootstrap import build_provider_registry
from app.providers.model_selector import ModelSelector
from app.providers.provider_selector import ProviderSelector
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

        registry = build_provider_registry(settings)

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
            provider_registry=registry,
            telemetry_service=get_telemetry_service(),
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
            detail=f"Provider returned HTTP {exc.response.status_code}.",
        ) from exc

    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Could not connect to the AI provider.",
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Generation failed: {type(exc).__name__}.",
        ) from exc