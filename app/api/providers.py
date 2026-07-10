from fastapi import APIRouter

from app.core.settings import get_settings
from app.providers.openrouter import OpenRouterProvider
from app.providers.registry import ProviderRegistry

router = APIRouter(
    prefix="/v1",
    tags=["Providers"],
)


@router.get("/providers")
async def list_providers() -> dict[str, list[dict[str, object]]]:
    settings = get_settings()

    registry = ProviderRegistry(
        providers=[
            OpenRouterProvider(settings),
        ]
    )

    return {
        "providers": [
            {
                "id": provider.name,
                "status": "available",
                "default_model": settings.default_model,
            }
            for provider in registry.all()
        ]
    }