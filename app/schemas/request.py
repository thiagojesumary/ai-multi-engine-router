from enum import StrEnum

from pydantic import BaseModel, Field


class TaskType(StrEnum):
    GENERAL = "general"
    ANALYSIS = "analysis"
    SUMMARIZATION = "summarization"
    GENERATION = "generation"
    REASONING = "reasoning"


class GenerationRequest(BaseModel):
    task: TaskType = TaskType.GENERAL
    input: str = Field(min_length=1, max_length=50_000)
    model: str | None = None
    temperature: float = Field(default=0.2, ge=0.0, le=2.0)
    max_tokens: int = Field(default=500, ge=1, le=8_192)