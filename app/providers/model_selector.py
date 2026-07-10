from app.core.settings import Settings
from app.schemas.request import GenerationRequest, TaskType


class ModelSelector:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings

    def select(self, request: GenerationRequest) -> str:
        if request.model:
            return request.model

        task_models: dict[TaskType, str] = {
            TaskType.GENERAL: self._settings.default_model,
            TaskType.ANALYSIS: self._settings.default_model,
            TaskType.SUMMARIZATION: self._settings.default_model,
            TaskType.GENERATION: self._settings.default_model,
            TaskType.REASONING: self._settings.default_model,
        }

        return task_models.get(
            request.task,
            self._settings.default_model,
        )