from time import perf_counter

from app.providers.registry import ProviderRegistry
from app.router.engine import RouterEngine
from app.schemas.request import GenerationRequest
from app.schemas.response import GenerationResponse
from app.telemetry.service import TelemetryService


class GenerationService:
    def __init__(
        self,
        router_engine: RouterEngine,
        provider_registry: ProviderRegistry,
        telemetry_service: TelemetryService,
    ) -> None:
        self._router_engine = router_engine
        self._provider_registry = provider_registry
        self._telemetry_service = telemetry_service

    async def generate(
        self,
        request: GenerationRequest,
    ) -> GenerationResponse:
        decision = self._router_engine.route(request)

        provider_names = [decision.provider_name]

        if (
            decision.provider_name != "mock"
            and self._provider_registry.exists("mock")
        ):
            provider_names.append("mock")

        last_exception: Exception | None = None

        for index, provider_name in enumerate(provider_names):
            provider = self._provider_registry.get(provider_name)
            fallback = index > 0
            started_at = perf_counter()

            try:
                content = await provider.generate(
                    request=request,
                    model=decision.model,
                )

                latency_ms = int(
                    (perf_counter() - started_at) * 1000
                )

                self._telemetry_service.record_success(
                    provider=provider.name,
                    model=decision.model,
                    task=decision.task,
                    latency_ms=latency_ms,
                    fallback=fallback,
                )

                return GenerationResponse(
                    provider=provider.name,
                    model=decision.model,
                    latency_ms=latency_ms,
                    fallback=fallback,
                    response=content,
                )

            except Exception as exc:
                latency_ms = int(
                    (perf_counter() - started_at) * 1000
                )

                self._telemetry_service.record_failure(
                    provider=provider.name,
                    model=decision.model,
                    task=decision.task,
                    latency_ms=latency_ms,
                    fallback=fallback,
                    error_type=type(exc).__name__,
                )

                last_exception = exc

        if last_exception is not None:
            raise last_exception

        raise RuntimeError("No providers available for generation.")