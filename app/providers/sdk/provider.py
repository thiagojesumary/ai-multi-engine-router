from abc import ABC, abstractmethod

from app.schemas.request import GenerationRequest


class Provider(ABC):
    """
    Base contract for every AI provider.
    """

    name: str

    @abstractmethod
    async def generate(
        self,
        request: GenerationRequest,
        model: str,
    ) -> str:
        ...