from datetime import datetime, timezone

from pydantic import BaseModel


class TelemetryEvent(BaseModel):
    timestamp: datetime
    provider: str
    model: str
    task: str
    latency_ms: int
    fallback: bool
    status: str
    error_type: str | None = None

    @classmethod
    def success(
        cls,
        provider: str,
        model: str,
        task: str,
        latency_ms: int,
        fallback: bool,
    ) -> "TelemetryEvent":
        return cls(
            timestamp=datetime.now(timezone.utc),
            provider=provider,
            model=model,
            task=task,
            latency_ms=latency_ms,
            fallback=fallback,
            status="success",
        )

    @classmethod
    def failure(
        cls,
        provider: str,
        model: str,
        task: str,
        latency_ms: int,
        fallback: bool,
        error_type: str,
    ) -> "TelemetryEvent":
        return cls(
            timestamp=datetime.now(timezone.utc),
            provider=provider,
            model=model,
            task=task,
            latency_ms=latency_ms,
            fallback=fallback,
            status="failure",
            error_type=error_type,
        )
