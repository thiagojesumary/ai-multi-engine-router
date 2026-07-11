class FallbackPolicy:

    def __init__(self):
        self._chain = [
            "openrouter",
            "mock",
        ]

    def providers(self):
        return self._chain