from fastapi import APIRouter

from app.core.container import get_telemetry_service
from app.telemetry.models import TelemetryEvent

router = APIRouter(
    prefix="/v1",
    tags=["Telemetry"],
)


@router.get(
    "/telemetry",
    response_model=list[TelemetryEvent],
)
async def list_telemetry() -> list[TelemetryEvent]:
    return get_telemetry_service().list_events()