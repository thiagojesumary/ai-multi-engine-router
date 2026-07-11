from app.providers.sdk.factory import ProviderFactory


class ProviderSDK:
    @staticmethod
    def providers() -> list[str]:
        return ProviderFactory.names()