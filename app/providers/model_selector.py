from app.schemas.request import GenerationRequest, TaskType


class ModelSelector:
    def select(
        self,
        request: GenerationRequest,
    ) -> tuple[str, str]:
        if request.model:
            return "openrouter", request.model

        task_routes: dict[TaskType, tuple[str, str]] = {
            TaskType.GENERAL: (
                "openrouter",
                "openrouter/free",
            ),
            TaskType.ANALYSIS: (
                "openrouter",
                "openrouter/free",
            ),
            TaskType.SUMMARIZATION: (
                "openrouter",
                "openrouter/free",
            ),
            TaskType.GENERATION: (
                "cerebras",
                "gpt-oss-120b",
            ),
            TaskType.REASONING: (
                "groq",
                "llama-3.3-70b-versatile",
            ),
        }

        return task_routes[request.task]