from app.core.settings import Settings
from app.providers.mock import MockProvider
from app.providers.openrouter import OpenRouterProvider
from app.providers.registry import ProviderRegistry
from app.providers.sdk import ProviderFactory


def build_provider_registry(
    settings: Settings,
) -> ProviderRegistry:
    providers = []

    for provider_name in ProviderFactory.names():
        if provider_name == "openrouter":
            providers.append(
                ProviderFactory.create(
                    provider_name,
                    settings=settings,
                )
            )
        elif provider_name == "mock":
            providers.append(
                ProviderFactory.create(provider_name)
            )

    return ProviderRegistry(providers)