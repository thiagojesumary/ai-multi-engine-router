from app.core.settings import Settings
from app.providers.mock import MockProvider
from app.providers.openrouter import OpenRouterProvider
from app.providers.registry import ProviderRegistry
from app.providers.sdk import ProviderFactory
from app.providers.groq import GroqProvider
from app.providers.cerebras import CerebrasProvider
from app.providers.gemini import GeminiProvider
from app.providers.ollama import OllamaProvider
from app.providers.huggingface import HuggingFaceProvider
from app.providers.mistral import MistralProvider
from app.providers.deepseek import DeepSeekProvider

"""
Provider Bootstrap
==================

Builds the application's Provider Registry by instantiating every
configured AI provider and registering it into the runtime.

This bootstrap is executed once during application startup.

Registration Rules
------------------

OpenRouter
    Always registered.
    Acts as the default provider.

Mock
    Always registered.
    Used for automatic fallback and testing.

Groq
    Registered only when GROQ_API_KEY is configured.

Cerebras
    Registered only when CEREBRAS_API_KEY is configured.

Gemini
    Registered only when GEMINI_API_KEY is configured.

Ollama
    Always registered.
    Connects to the local Ollama server configured by
    OLLAMA_BASE_URL.

Hugging Face
    Registered only when HUGGINGFACE_API_KEY is configured.

Mistral
    Registered only when MISTRAL_API_KEY is configured.

DeepSeek
    Registered only when DEEPSEEK_API_KEY is configured.


Provider Registration Flow
--------------------------

Settings (.env)
        │
        ▼
ProviderFactory
        │
        ▼
Instantiate Provider
        │
        ▼
Provider Registry
        │
        ▼
Provider Selector
        │
        ▼
Router Engine
        │
        ▼
Telemetry
        │
        ▼
Dashboard


Notes
-----

• Providers are automatically discovered through ProviderFactory.

• Providers without valid credentials are ignored
  (except OpenRouter, Mock and Ollama).

• Every provider follows the same Provider interface,
  allowing the Router Engine to switch providers without
  changing business logic.

• New providers can be added by:
    1. Creating the provider implementation.
    2. Registering it with ProviderFactory.register().
    3. Adding its configuration to Settings.
    4. Registering it in this bootstrap.

The remainder of the routing pipeline requires no changes.
"""

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

        elif provider_name == "groq":
            if settings.groq_api_key:
                providers.append(
                    ProviderFactory.create(
                        provider_name,
                        settings=settings,
                    )
                )

        elif provider_name == "cerebras":
            if settings.cerebras_api_key:
                providers.append(
                    ProviderFactory.create(
                        provider_name,
                        settings=settings,
                    )
                )

        elif provider_name == "gemini":
            if settings.gemini_api_key:
                providers.append(
                    ProviderFactory.create(
                        provider_name,
                        settings=settings,
                    )
                )

        elif provider_name == "ollama":
            providers.append(
                ProviderFactory.create(
                    provider_name,
                    settings=settings,
                )
            )

        elif provider_name == "huggingface":
            if settings.huggingface_api_key:
                providers.append(
                    ProviderFactory.create(
                        provider_name,
                        settings=settings,
                    )
                )

        elif provider_name == "mistral":
            if settings.mistral_api_key:
                providers.append(
                    ProviderFactory.create(
                        provider_name,
                        settings=settings,
                    )
                )

        elif provider_name == "deepseek":
            if settings.deepseek_api_key:
                providers.append(
                    ProviderFactory.create(
                        provider_name,
                        settings=settings,
                    )
                )

    return ProviderRegistry(providers)