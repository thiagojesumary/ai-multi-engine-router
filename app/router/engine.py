from dataclasses import dataclass

from app.providers.base import AIProvider
from app.providers.model_selector import ModelSelector
from app.providers.provider_selector import ProviderSelector
from app.schemas.request import GenerationRequest


@dataclass(frozen=True)
class RouteDecision:
    provider: AIProvider
    provider_name: str
    model: str
    task: str


class RouterEngine:
    def __init__(
        self,
        provider_selector: ProviderSelector,
        model_selector: ModelSelector,
    ) -> None:
        self._provider_selector = provider_selector
        self._model_selector = model_selector

    def route(
        self,
        request: GenerationRequest,
    ) -> RouteDecision:
        provider_name, model = self._model_selector.select(request)

        provider = self._provider_selector.select(provider_name)

        return RouteDecision(
            provider=provider,
            provider_name=provider_name,
            model=model,
            task=request.task.value,
        )