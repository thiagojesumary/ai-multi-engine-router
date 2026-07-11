from app.telemetry.models import TelemetryEvent


class InMemoryTelemetryStore:
    def __init__(self) -> None:
        self._events: list[TelemetryEvent] = []

    def record(self, event: TelemetryEvent) -> None:
        self._events.append(event)

    def all(self) -> list[TelemetryEvent]:
        return list(self._events)

    def clear(self) -> None:
        self._events.clear()
