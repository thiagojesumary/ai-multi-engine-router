from time import perf_counter

from app.core.settings import Settings
from app.router.engine import RouterEngine
from app.schemas.request import GenerationRequest
from app.schemas.response import GenerationResponse


class GenerationService:
    def __init__(
        self,
        router_engine: RouterEngine,
        settings: Settings,
    ) -> None:
        self._router_engine = router_engine
        self._settings = settings

    async def generate(
        self,
        request: GenerationRequest,
    ) -> GenerationResponse:
        decision = self._router_engine.route(request)

        started_at = perf_counter()

        try:
            content = await decision.provider.generate(
                request=request,
                model=decision.model,
            )

            latency_ms = int(
                (perf_counter() - started_at) * 1000
            )

            return GenerationResponse(
                provider=decision.provider.name,
                model=decision.model,
                latency_ms=latency_ms,
                fallback=False,
                response=content,
            )

        except Exception:
            fallback_model = self._settings.fallback_model

            if fallback_model == decision.model:
                raise

            fallback_started_at = perf_counter()

            content = await decision.provider.generate(
                request=request,
                model=fallback_model,
            )

            latency_ms = int(
                (perf_counter() - fallback_started_at) * 1000
            )

            return GenerationResponse(
                provider=decision.provider.name,
                model=fallback_model,
                latency_ms=latency_ms,
                fallback=True,
                response=content,
            )