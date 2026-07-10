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


@lru_cache
def get_settings() -> Settings:
    return Settings()