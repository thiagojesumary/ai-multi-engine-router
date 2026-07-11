from functools import lru_cache

from app.telemetry.service import TelemetryService
from app.telemetry.store import InMemoryTelemetryStore


@lru_cache
def get_telemetry_store() -> InMemoryTelemetryStore:
    return InMemoryTelemetryStore()


@lru_cache
def get_telemetry_service() -> TelemetryService:
    return TelemetryService(
        store=get_telemetry_store()
    )
