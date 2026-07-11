from pydantic import BaseModel


class ProviderScore(BaseModel):
    provider: str
    total_requests: int
    successful_requests: int
    failed_requests: int
    success_rate: float
    failure_rate: float
    average_latency_ms: float
    score: float