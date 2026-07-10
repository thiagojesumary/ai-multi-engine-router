from pydantic import BaseModel


class GenerationResponse(BaseModel):
    provider: str
    model: str
    latency_ms: int
    fallback: bool
    response: str