from typing import Any

import httpx

from app.core.settings import Settings
from app.providers.base import AIProvider
from app.providers.sdk import ProviderFactory
from app.schemas.request import GenerationRequest


class GeminiProvider(AIProvider):
    name = "gemini"

    def __init__(self, settings: Settings) -> None:
        if not settings.gemini_api_key:
            raise ValueError("GEMINI_API_KEY is not configured.")

        self._settings = settings

    async def generate(
        self,
        request: GenerationRequest,
        model: str,
    ) -> str:
        url = (
            f"{self._settings.gemini_base_url}"
            f"/models/{model}:generateContent"
            f"?key={self._settings.gemini_api_key}"
        )

        payload: dict[str, Any] = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": request.input,
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": request.temperature,
                "maxOutputTokens": request.max_tokens,
            },
        }

        timeout = httpx.Timeout(
            self._settings.request_timeout_seconds
        )

        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(
                url,
                json=payload,
                headers={
                    "Content-Type": "application/json",
                },
            )

        response.raise_for_status()

        data = response.json()

        try:
            content = (
                data["candidates"][0]
                ["content"]["parts"][0]["text"]
            )
        except (KeyError, IndexError, TypeError) as exc:
            raise RuntimeError(
                "Gemini returned an unexpected response."
            ) from exc

        if not isinstance(content, str) or not content.strip():
            raise RuntimeError(
                "Gemini returned an empty response."
            )

        return content


ProviderFactory.register(GeminiProvider)