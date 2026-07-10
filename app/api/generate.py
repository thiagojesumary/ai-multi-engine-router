import httpx
from fastapi import APIRouter, HTTPException, status
from pydantic import ValidationError

from app.core.settings import get_settings
from app.providers.openrouter import OpenRouterProvider
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
        provider = OpenRouterProvider(settings)
        service = GenerationService(provider, settings)

        return await service.generate(request)

    except ValidationError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Application configuration is invalid or OPENROUTER_API_KEY is missing.",
        ) from exc

    except httpx.HTTPStatusError as exc:
        upstream_status = exc.response.status_code

        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"OpenRouter returned HTTP {upstream_status}.",
        ) from exc

    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Could not connect to OpenRouter.",
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Generation request failed: {type(exc).__name__}.",
        ) from exc