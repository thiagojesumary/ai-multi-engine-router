from app.providers.base import AIProvider
from app.providers.registry import ProviderRegistry


class ProviderSelector:
    def __init__(
        self,
        registry: ProviderRegistry,
        default_provider: str = "openrouter",
    ) -> None:
        self._registry = registry
        self._default_provider = default_provider

    def select(self, provider_name: str | None = None) -> AIProvider:
        selected_provider = provider_name or self._default_provider
        return self._registry.get(selected_provider)