# 🧠 AI Multi-Engine Router

### Intelligent Multi-Provider AI Routing Infrastructure

Real-time telemetry • Automatic fallback • Provider scoring • Mission Control dashboard

An enterprise-grade open-source platform for routing AI requests across multiple providers, monitoring operational health in real time, and providing a unified Mission Control experience for observability and intelligent provider orchestration.

---

# ✨ Showcase

Explore the AI Multi-Engine Router through its real-time Mission Control interface.

---

### 🧠 Mission Control Dashboard

<img src="docs/images/dashboard.jpg" width="100%" alt="Mission Control Dashboard"/>


# Features

## Multi-Provider Routing

- Intelligent provider selection
- Task-based routing
- Provider abstraction layer
- Provider Registry
- Provider SDK
- Model Selector
- Router Engine
- Automatic fallback
- Extensible provider architecture

---

## Supported Providers

| Provider      | Integration |
| ------------- | ----------- |
| OpenRouter    | ✅           |
| Groq          | ✅           |
| Cerebras      | ✅           |
| Google Gemini | ✅           |
| Ollama        | ✅           |
| Hugging Face  | ✅           |
| DeepSeek      | ✅           |
| Nexum Runtime | ✅ Internal  |
| Mistral AI    | 🚧 Planned  |


---

## Mission Control Dashboard

Real-time dashboard built with Next.js.

Includes:

- Live Providers
- Provider Scores
- Telemetry
- Playground
- Health Monitor
- Backend Status
- Active Provider
- Selected Model
- Latency
- Automatic Polling
- Retry States
- Error Handling
- Internal Response Scroll
- Sci-Fi Interface

---

## Telemetry

The Router continuously records:

- Provider
- Model
- Task
- Latency
- Success
- Failure
- Automatic Fallback
- Request History

---

## Provider Scoring

Every provider receives a dynamic score based on:

- Latency
- Availability
- Success Rate
- Reliability

Designed to evolve into intelligent routing decisions.

---

## Automatic Fallback

Primary Provider
        │
        ▼
Secondary Provider
        │
        ▼
Fallback Provider
        │
        ▼
Nexum Runtime

No application interruption.

---

# Architecture

```text
                    Client

                       │

          Next.js Mission Control

                       │

                 REST API

                       │

                   FastAPI

                       │

                Router Engine

        ┌──────────┼──────────┐
        │          │          │

 Provider Selector  Model Selector

        │

  Automatic Fallback

        │

 Telemetry + Provider Scores

        │

 ┌─────────────────────────────────────┐

 OpenRouter
 Groq
 Cerebras
 Google Gemini
 Ollama
 Hugging Face
 DeepSeek
 Nexum Runtime

 └─────────────────────────────────────┘
```

---

# Project Structure

```text
AI-Multi-Engine-Router

app/
│
├── api/
├── core/
├── providers/
├── router/
├── telemetry/
├── schemas/
├── services/
└── main.py

dashboard/
│
├── app/
├── components/
├── public/
├── lib/
└── styles/

docs/

README.md
```

---

# Installation

## Clone

```bash
git clone https://github.com/thiagojesumary/ai-multi-engine-router.git

cd ai-multi-engine-router
```

---

# Backend

Install dependencies

```bash
uv sync
```

Run

```bash
uv run uvicorn app.main:app --reload
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

# Dashboard

```bash
cd dashboard

npm install

npm run dev
```

Open

```
http://localhost:3000/lp
```

---

# Environment Variables

## Backend

```env
OPENROUTER_API_KEY=

GROQ_API_KEY=

CEREBRAS_API_KEY=

GEMINI_API_KEY=

HUGGINGFACE_API_KEY=

DEEPSEEK_API_KEY=

OLLAMA_BASE_URL=http://localhost:11434/v1
```

---

## Dashboard

```env
NEXT_PUBLIC_ROUTER_API_URL=http://127.0.0.1:8000
```

---

# API

## Health

```
GET /health
```

---

## Providers

```
GET /v1/providers
```

---

## Provider Scores

```
GET /v1/provider-scores
```

---

## Telemetry

```
GET /v1/telemetry
```

---

## Generate

```
POST /v1/generate
```

---

# Playground

1. Open Playground

2. Choose a task

or

Use one of the Quick Prompts

- Explain Telemetry
- Test Fallback
- Production Routing
- Generate LinkedIn Post
- Summarize Architecture

3. Click **Generate**

4. Observe:

- Selected Provider
- Selected Model
- Latency
- Fallback
- Response

# Example Prompts

The following prompts can be used to explore the capabilities of the AI Multi-Engine Router through the Mission Control Playground.

They exercise routing, telemetry, provider selection, automatic fallback, architecture analysis and code generation while producing real telemetry events.

1️⃣ Explain Telemetry

Explain why telemetry is essential in a multi-provider AI router and which metrics should be collected to continuously improve routing decisions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ Automatic Fallback

Explain how automatic fallback should behave when the primary AI provider becomes unavailable during a production request.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ Production Routing

Design an enterprise AI routing strategy capable of intelligently selecting providers based on latency, reasoning quality, availability and operational cost.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ Provider Comparison

Compare OpenRouter, Groq, Cerebras, Gemini, Hugging Face, DeepSeek and Ollama considering:

• Speed
• Latency
• Reasoning
• Coding
• Cost
• Reliability

Provide a final ranking.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5️⃣ Mission Control

Describe the responsibilities of a Mission Control dashboard responsible for monitoring an AI routing infrastructure in real time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6️⃣ AI Infrastructure

Design the architecture of an enterprise AI platform supporting multiple providers, automatic fallback, telemetry, scoring, health monitoring and observability.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7️⃣ FastAPI

Generate a production-ready FastAPI endpoint implementing provider routing using dependency injection and a provider registry.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8️⃣ Next.js

Generate a Mission Control dashboard using Next.js, TypeScript, TailwindCSS and Framer Motion for monitoring an AI routing infrastructure.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

9️⃣ Telemetry Analytics

Explain how telemetry data can be used to optimize provider selection, reduce latency and improve routing reliability over time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔟 Executive Summary

Summarize the AI Multi-Engine Router for a CTO evaluating enterprise AI infrastructure.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣1️⃣ LinkedIn Post

Write a professional LinkedIn announcement introducing the AI Multi-Engine Router as an open-source project.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣2️⃣ README Generator

Generate a professional GitHub README describing an enterprise AI routing infrastructure with telemetry, provider scoring and Mission Control.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣3️⃣ Failure Simulation

Simulate the failure of the primary provider and explain, step by step, how the router should recover while maintaining service availability.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣4️⃣ Provider Intelligence

Explain how provider scoring should evolve over time using telemetry, historical latency, failures and success rate.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣5️⃣ Future Roadmap

Propose the next major features for AI Multi-Engine Router over the next four public releases.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣6️⃣ Architecture Review

Review the architecture of an AI Multi-Engine Router and identify strengths, bottlenecks and opportunities for future scalability.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣7️⃣ Python Code Generation

Generate production-quality Python code implementing an asynchronous provider registry with automatic fallback and telemetry events.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣8️⃣ Stress Test

Describe how the router should behave while processing 10,000 concurrent requests across multiple AI providers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣9️⃣ Observability

Explain why observability, telemetry and health monitoring are critical components of enterprise AI infrastructure.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣0️⃣ The Vision

Explain how an AI Multi-Engine Router could become the cognitive infrastructure behind autonomous AI platforms such as Nexum.

---

# Available Tasks

- General
- Analysis
- Summarization
- Generation
- Reasoning

Each task can be routed to a different provider and model.

---

# Current Stack

## Backend

- Python
- FastAPI
- Pydantic
- HTTPX
- Uvicorn

---

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide React

---

# Roadmap

## v1.0

- Multi-provider routing
- Mission Control Dashboard
- Playground
- Telemetry
- Provider Scores
- Automatic Fallback
- Health Monitoring

---

## v1.1

- Provider Identity
- Provider Notifications
- Provider Analytics
- Better Dashboard Visualizations

---

## v1.2

- Additional Providers
- Local Models
- Intelligent Model Selection
- Cost Optimization

---

## v1.3

- Provider Intelligence
- Historical Metrics
- Reliability Reports
- Performance Trends

---

## v1.4

- Advanced Telemetry
- Event Timeline
- Alerts
- AI Routing Insights

---

# Contributing

Contributions are welcome.

Feel free to open Issues and Pull Requests.

---

# License

MIT License

---

# Author

## Open Source Project

Created by **Thiago Jesumary**

LinkedIn

https://www.linkedin.com/in/thiago-jesumary/

GitHub

https://github.com/thiagojesumary

---

## If this project helped you

⭐ Star the repository.

It helps the project reach more developers and supports future improvements.
