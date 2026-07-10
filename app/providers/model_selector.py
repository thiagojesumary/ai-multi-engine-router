import json
from pathlib import Path

from app.schemas.request import GenerationRequest


class ModelSelector:
    def __init__(
        self,
        routing_config_path: str = "app/config/routing.json",
    ) -> None:
        self._routing_config_path = Path(routing_config_path)
        self._routing_config = self._load_config()

    def _load_config(self) -> dict[str, dict[str, str]]:
        if not self._routing_config_path.exists():
            raise FileNotFoundError(
                f"Routing configuration not found: {self._routing_config_path}"
            )

        with self._routing_config_path.open(
            "r",
            encoding="utf-8",
        ) as config_file:
            return json.load(config_file)

    def select(
        self,
        request: GenerationRequest,
    ) -> tuple[str, str]:
        if request.model:
            return "openrouter", request.model

        task_name = request.task.value

        route = self._routing_config.get(
            task_name,
            self._routing_config["general"],
        )

        return route["provider"], route["model"]