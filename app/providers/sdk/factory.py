from typing import Any, TypeVar

from app.providers.sdk.provider import Provider

ProviderType = TypeVar("ProviderType", bound=Provider)


class ProviderFactory:
    _providers: dict[str, type[Provider]] = {}

    @classmethod
    def register(
        cls,
        provider: type[Provider],
    ) -> None:
        cls._providers[provider.name] = provider

    @classmethod
    def create(
        cls,
        provider_name: str,
        **kwargs: Any,
    ) -> Provider:
        try:
            provider_class = cls._providers[provider_name]
        except KeyError as exc:
            raise ValueError(
                f"Provider '{provider_name}' is not registered."
            ) from exc

        return provider_class(**kwargs)

    @classmethod
    def names(cls) -> list[str]:
        return list(cls._providers.keys())