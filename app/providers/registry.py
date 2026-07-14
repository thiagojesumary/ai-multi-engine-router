from collections.abc import Iterable

from app.providers.base import AIProvider


class ProviderRegistry:
    """
    Central registry for every AI provider available in the application.
    """

    def __init__(self, providers: Iterable[AIProvider]) -> None:
        self._providers = {
            provider.name: provider
            for provider in providers
        }

    def get(self, provider_name: str) -> AIProvider:
        try:
            return self._providers[provider_name]
        except KeyError as exc:
            raise ValueError(
                f"Provider '{provider_name}' is not registered."
            ) from exc

    def all(self) -> list[AIProvider]:
        return list(self._providers.values())

    def names(self) -> list[str]:
        return list(self._providers.keys())

    def exists(self, provider_name: str) -> bool:
        return provider_name in self._providers
