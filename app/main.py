from fastapi import FastAPI

app = FastAPI(
    title="AI Multi-Engine Router",
    version="0.1.0",
    description=(
        "Production-ready API for multi-provider LLM orchestration, "
        "model routing, fallback strategies, and telemetry."
    ),
)


@app.get("/", tags=["System"])
async def root() -> dict[str, str]:
    return {
        "service": "AI Multi-Engine Router",
        "version": "0.1.0",
        "status": "running",
    }


@app.get("/health", tags=["System"])
async def health() -> dict[str, str]:
    return {
        "status": "healthy",
    }