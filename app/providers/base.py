from abc import ABC, abstractmethod

from app.schemas.request import GenerationRequest


class AIProvider(ABC):
    name: str

    @abstractmethod
    async def generate(
        self,
        request: GenerationRequest,
        model: str,
    ) -> str:
        raise NotImplementedError