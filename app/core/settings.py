from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"

    openrouter_api_key: str
    openrouter_base_url: str = "https://openrouter.ai/api/v1"

    default_model: str = "openrouter/free"
    fallback_model: str = "openrouter/free"

    request_timeout_seconds: float = 90.0

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    groq_api_key: str | None = None
    groq_base_url: str = "https://api.groq.com/openai/v1"
    groq_default_model: str = "llama-3.3-70b-versatile"

    cerebras_api_key: str | None = None
    cerebras_base_url: str = "https://api.cerebras.ai/v1"
    cerebras_default_model: str = "gpt-oss-120b"

    gemini_api_key: str | None = None
    gemini_base_url: str = "https://generativelanguage.googleapis.com/v1beta"
    gemini_default_model: str = "gemini-2.5-flash"

    ollama_api_key: str | None = None
    ollama_base_url: str = "http://localhost:11434/v1"
    ollama_default_model: str = "llama3.2"

    huggingface_api_key: str | None = None
    huggingface_base_url: str = "https://router.huggingface.co/v1"
    huggingface_default_model: str = "Qwen/Qwen3-32B"

    mistral_api_key: str | None = None
    mistral_base_url: str = "https://api.mistral.ai/v1"
    mistral_default_model: str = "mistral-small-latest"

    deepseek_api_key: str | None = None
    deepseek_base_url: str = "https://api.deepseek.com/v1"
    deepseek_default_model: str = "deepseek-chat"


@lru_cache
def get_settings() -> Settings:
    return Settings()