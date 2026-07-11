from app.telemetry.models import TelemetryEvent
from app.telemetry.store import InMemoryTelemetryStore


class TelemetryService:
    def __init__(self, store: InMemoryTelemetryStore) -> None:
        self._store = store

    def record_success(
        self,
        provider: str,
        model: str,
        task: str,
        latency_ms: int,
        fallback: bool,
    ) -> None:
        self._store.record(
            TelemetryEvent.success(
                provider=provider,
                model=model,
                task=task,
                latency_ms=latency_ms,
                fallback=fallback,
            )
        )

    def record_failure(
        self,
        provider: str,
        model: str,
        task: str,
        latency_ms: int,
        fallback: bool,
        error_type: str,
    ) -> None:
        self._store.record(
            TelemetryEvent.failure(
                provider=provider,
                model=model,
                task=task,
                latency_ms=latency_ms,
                fallback=fallback,
                error_type=error_type,
            )
        )

    def list_events(self) -> list[TelemetryEvent]:
        return self._store.all()
