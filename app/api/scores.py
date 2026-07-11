from fastapi import APIRouter

from app.core.container import get_provider_scoring_service
from app.scoring.models import ProviderScore

router = APIRouter(
    prefix="/v1",
    tags=["Scoring"],
)


@router.get(
    "/provider-scores",
    response_model=list[ProviderScore],
)
async def list_provider_scores() -> list[ProviderScore]:
    return get_provider_scoring_service().calculate_scores()