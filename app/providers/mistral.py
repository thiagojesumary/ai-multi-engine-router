from typing import Any

import httpx

from app.core.settings import Settings
from app.providers.base import AIProvider
from app.providers.sdk import ProviderFactory
from app.schemas.request import GenerationRequest


class MistralProvider(AIProvider):
    name = "mistral"

    def __init__(self, settings: Settings) -> None:
        if not settings.mistral_api_key:
            raise ValueError("MISTRAL_API_KEY is not configured.")

        self._settings = settings

    async def generate(
        self,
        request: GenerationRequest,
        model: str,
    ) -> str:
        url = f"{self._settings.mistral_base_url}/chat/completions"

        headers = {
            "Authorization": f"Bearer {self._settings.mistral_api_key}",
            "Content-Type": "application/json",
        }

        payload: dict[str, Any] = {
            "model": model,
            "messages": [
                {
                    "role": "user",
                    "content": request.input,
                }
            ],
            "temperature": request.temperature,
            "max_tokens": request.max_tokens,
        }

        timeout = httpx.Timeout(
            self._settings.request_timeout_seconds
        )

        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(
                url,
                headers=headers,
                json=payload,
            )

        response.raise_for_status()
        data = response.json()

        try:
            content = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:
            raise RuntimeError(
                "Mistral returned an unexpected response."
            ) from exc

        if not isinstance(content, str) or not content.strip():
            raise RuntimeError(
                "Mistral returned an empty response."
            )

        return content


ProviderFactory.register(MistralProvider)