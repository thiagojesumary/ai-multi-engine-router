from functools import lru_cache

from app.scoring.service import ProviderScoringService
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


@lru_cache
def get_provider_scoring_service() -> ProviderScoringService:
    return ProviderScoringService(
        telemetry_service=get_telemetry_service()
    )