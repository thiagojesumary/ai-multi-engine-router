from fastapi import APIRouter

from app.core.settings import get_settings
from app.providers.bootstrap import build_provider_registry

router = APIRouter(
    prefix="/v1",
    tags=["Providers"],
)


@router.get("/providers")
async def list_providers() -> dict[str, list[dict[str, object]]]:
    settings = get_settings()
    registry = build_provider_registry(settings)

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