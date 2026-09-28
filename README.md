# Indian E-Commerce Analytics Platform — Frontend

A production-quality React frontend for a SaaS-style analytics dashboard. This repository contains **only the frontend**; it consumes JSON from your existing FastAPI backend and performs no analytics calculations itself.

## Tech stack

- React 18 + TypeScript
- Vite
- React Router v6
- Tailwind CSS
- Recharts
- Axios
- Lucide React icons

## 1. Install

```bash
npm install
```

## 2. Configure the backend URL

Copy the example env file and point it at your running FastAPI instance:

```bash
cp .env.example .env
```

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_TIMEOUT_MS=15000
```

`VITE_API_BASE_URL` is the **only** place the backend host is configured — nothing in the codebase hardcodes `localhost` or any other host. Never put an OpenAI/LLM API key or any other secret in this file or anywhere in the frontend; secrets belong in FastAPI.

## 3. Run locally

```bash
npm run dev
```

The app runs at `http://localhost:5173` and expects your FastAPI server (with CORS enabled for that origin) to be reachable at `VITE_API_BASE_URL`.

## 4. Build for production

```bash
npm run build
npm run preview   # serve the production build locally to sanity-check it
```

Output is written to `dist/`.

## Connecting to FastAPI

All requests go through `src/services/api.js`, a single Axios instance configured with `VITE_API_BASE_URL`. Feature-specific calls live in:

- `src/services/customerService.js` — every Customer Analytics endpoint
- `src/services/aiService.js` — the Analytics Assistant chat endpoint

### Confirmed endpoints (per the current backend contract)

| Purpose | Method | Path |
|---|---|---|
| Total customers | GET | `/api/customer/total_customers` |
| Churn rate | GET | `/api/customer/churned_rate` |
| Average customer spend | GET | `/api/customer/avg_cust_spend` |
| Average order value | GET | `/api/customer/avg_order_value` |
| Monthly signups | GET | `/api/customer/monthly-signups` |
| Monthly signups by gender | GET | `/api/customer/monthly-signups-gender` |
| Year-wise signup trend | GET | `/api/customer/signup-trend` |
| Customer status / churn breakdown | GET | `/api/customer/churn` |
| Customer segment analysis | GET | `/api/customer/customer_segment?view=...` |

### Placeholder / assumed contracts

These are marked clearly in the code (search for `PLACEHOLDER`) since they weren't confirmed against a live backend:

- **Segment analysis** (`customerService.getCustomerSegment(view)`) assumes a single `GET /api/customer/customer_segment?view=<key>` endpoint that branches server-side on the `view` query param, where `view` is one of:
  `avg_spend_by_segment`, `total_spend_by_segment`, `count_by_segment`, `avg_vs_median_spend`, `spend_distribution`, `coefficient_of_variation`.
  If you'd rather expose one dedicated route per view, swap in the commented alternative functions at the bottom of `customerService.js`.
- **Analytics Assistant** (`aiService.askCustomerAnalyticsQuestion`) assumes `POST /api/ai/customer-chat` with body `{ question, chat_history }` and response `{ answer, insights }`.

### Expected response shapes

See `src/types/customer.ts` and `src/types/ai.ts` for the exact TypeScript interfaces the UI expects from each endpoint. If your FastAPI response fields are named differently, either adjust the backend response or update the matching interface + the field references in the corresponding chart/component — both are intentionally colocated with the feature so they're easy to keep in sync.

## Adding a new analytics module (Orders, Shipments, Payments, Ratings, Order Items)

Each of these currently renders a "Coming Soon" state via `src/components/common/ComingSoon.tsx`. To implement one:

1. Add types to `src/types/<module>.ts`.
2. Add a service file, e.g. `src/services/orderService.js`, following the pattern in `customerService.js`.
3. Build chart/KPI components under `src/components/charts/` and `src/components/dashboard/`.
4. Replace the `<ComingSoon />` render in `src/pages/<Module>/<Module>Page.tsx` with the real page content.

No other routing or layout changes are needed — the sidebar, header, and route are already wired up.

## Project structure

```
src/
├── assets/
├── components/
│   ├── layout/       Sidebar, Header, Layout shell
│   ├── common/        KpiCard, ChartCard, LoadingState, ErrorState, EmptyState, SelectFilter, ComingSoon, PageHeader, Skeleton
│   ├── charts/        One component per chart, each self-contained (fetch + render)
│   ├── dashboard/      CustomerKpiGrid (composes the 4 KPI cards)
│   └── ai/            AnalyticsAssistant, ChatMessage
├── pages/              One folder per route
├── services/           api.js, customerService.js, aiService.js
├── hooks/              useFetch, useMediaQuery
├── utils/              formatters.ts (INR currency, Indian number grouping, percent, compact numbers)
├── constants/          navigation.ts, customerSegment.ts, chartTheme.ts
├── routes/             AppRoutes.tsx (route table + per-page titles)
├── types/               TypeScript contracts for API responses
├── App.tsx
└── main.tsx
```

Every chart and KPI is self-contained: it owns its own `useFetch` call, and renders one of `LoadingState`, `ErrorState` (with Retry), `EmptyState`, or the chart itself. One endpoint failing never crashes the rest of the page.

## Deploying to Vercel

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In Vercel, **Add New Project** → import the repository.
3. Framework preset: Vercel auto-detects **Vite**. Confirm:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL` = the public URL of your deployed FastAPI backend (e.g. `https://api.yourdomain.com`)
   - `VITE_API_TIMEOUT_MS` = `15000` (optional)
5. Deploy. On every push to the connected branch, Vercel rebuilds automatically.
6. Make sure your FastAPI backend's CORS configuration allows requests from your Vercel domain (and any preview-deployment domains, if you use those).

### Deploying via the Vercel CLI (alternative)

```bash
npm i -g vercel
vercel        # first-time setup, links the project
vercel env add VITE_API_BASE_URL production
vercel --prod
```

## Notes on data integrity

- No analytics values, trend percentages, or chart data are computed or invented in the frontend — every number rendered comes directly from a FastAPI JSON response.
- KPI cards only show a trend indicator when the API response includes one; nothing is fabricated to fill the UI.
- If an endpoint's contract differs from what's assumed here, the fix is either to align the backend response or to update the single corresponding `types/*.ts` interface and its consuming component — never to hardcode a substitute value in React.
