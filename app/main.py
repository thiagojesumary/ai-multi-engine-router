from fastapi import FastAPI
from app.api.telemetry import router as telemetry_router
from app.api.generate import router as generation_router
from app.api.providers import router as providers_router
from app.api.scores import router as scores_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Multi-Engine Router",
    version="0.1.0",
    description=(
        "Production-ready API for multi-provider LLM orchestration, "
        "model routing, fallback strategies, and telemetry."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generation_router)
app.include_router(providers_router)
app.include_router(telemetry_router)
app.include_router(scores_router)

@app.get("/", tags=["System"])
async def root() -> dict[str, str]:
    return {
        "service": "AI Multi-Engine Router",
        "version": "0.1.0",
        "status": "running",
    }


@app.get("/health", tags=["System"])
async def health() -> dict[str, str]:
    return {"status": "healthy"}