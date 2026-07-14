# AI Multi Engine Router — Mission Control

Single-route Next.js 13.5.1 (App Router) dashboard at `app/lp/page.tsx`. Navigation
between Dashboard / Providers / Scores / Telemetry / Playground / System is done
with client-side state — there is only one page, so nothing scrolls or reloads.

## Run it

```bash
npm install
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_BASE_URL at your backend
npm run dev
```

Open `http://localhost:3000` (redirects to `/lp`).

## Assets

Drop these two files into `/public` and they're picked up automatically:

- `public/logo.png` — used top-left in the sidebar. Until present, a generated
  icon mark is shown instead (`Sidebar.tsx`, `onError` fallback).
- `public/brainai.png` — the router core. Until present, an animated SVG brain
  is drawn in its place (`BrainCore.tsx`, `onError` fallback). Sizing (42%
  width / 38% height of the operations panel) is preserved either way.

## Endpoints this build consumes

| Endpoint | Used by |
|---|---|
| `GET /health` | Header status pill, sidebar status dot, footer health bar, System tab |
| `GET /v1/providers` | Providers rail (dashboard) + Providers tab |
| `GET /v1/provider-scores` | Scores tab |
| `GET /v1/telemetry` | Telemetry tab (timeline, activity feed, provider events) |
| `POST /v1/generate` | Playground tab |
| `GET /v1/metrics` | KPI row + main flow chart |

`GET /v1/metrics` is **not** enumerated in the original brief — the KPI row
needed a source and none was specified, so this path (and the `RouterMetrics`
shape in `lib/types.ts`) is an assumption. If your backend exposes these
numbers elsewhere, change the one call in `lib/api.ts::getMetrics`.

Every panel polls independently (`lib/useApi.ts`) and renders one of four
states: loading, success, error (with retry), or offline (browser
`navigator.onLine` / `offline` event) — no mocked data, no fixed arrays.

## Stack

Next 13.5.1 · React 18.2 · TypeScript (strict) · Tailwind · Framer Motion ·
Recharts · lucide-react · axios.

## Note on Next 13.5.1

This exact version has a known, publicly disclosed security advisory. It was
pinned because the brief specified it explicitly; for anything beyond a demo,
upgrade to a patched 13.5.x/14.x release before deploying.
