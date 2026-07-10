from time import perf_counter

from app.core.settings import Settings
from app.providers.base import AIProvider
from app.schemas.request import GenerationRequest
from app.schemas.response import GenerationResponse


class GenerationService:
    def __init__(
        self,
        provider: AIProvider,
        settings: Settings,
    ) -> None:
        self._provider = provider
        self._settings = settings

    async def generate(
        self,
        request: GenerationRequest,
    ) -> GenerationResponse:
        primary_model = request.model or self._settings.default_model
        started_at = perf_counter()

        try:
            content = await self._provider.generate(
                request=request,
                model=primary_model,
            )

            latency_ms = int((perf_counter() - started_at) * 1000)

            return GenerationResponse(
                provider=self._provider.name,
                model=primary_model,
                latency_ms=latency_ms,
                fallback=False,
                response=content,
            )

        except Exception:
            fallback_model = self._settings.fallback_model

            if fallback_model == primary_model:
                raise

            fallback_started_at = perf_counter()

            content = await self._provider.generate(
                request=request,
                model=fallback_model,
            )

            latency_ms = int((perf_counter() - fallback_started_at) * 1000)

            return GenerationResponse(
                provider=self._provider.name,
                model=fallback_model,
                latency_ms=latency_ms,
                fallback=True,
                response=content,
            )