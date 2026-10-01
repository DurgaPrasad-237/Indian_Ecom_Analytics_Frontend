# E-Commerce Analytics Platform — Frontend

A React-based SaaS-style analytics dashboard for the **Indian E-Commerce Analytics Platform**.

This repository contains **only the frontend application**. It consumes JSON responses from the FastAPI backend through REST APIs and does not perform analytics calculations itself.

The application provides interactive dashboards for customer, product, and sales analytics, along with an AI-powered Analytics Assistant for natural-language analytics queries.

---

## Overview

The frontend provides an interactive interface for exploring e-commerce analytics through KPI cards, charts, tables, and other visualizations.

The application communicates with the FastAPI backend through REST APIs. The backend is responsible for data processing, analytics calculations, and AI-powered tool calling, while the frontend focuses on presenting the results and providing an interactive user experience.

The frontend also includes domain-specific Analytics Assistants for:

* Customer Analytics
* Product Analytics
* Sales Analytics

Users can ask natural-language questions through the Analytics Assistant, which sends the request to the backend AI layer for processing.

---

## Features

* Interactive e-commerce analytics dashboard
* Customer analytics dashboard
* Product analytics dashboard
* Sales analytics dashboard
* KPI cards for key business metrics
* Interactive charts and visualizations
* Customer segmentation analysis
* Customer churn analysis
* Customer signup trends
* Product sales analysis
* Product revenue analysis
* Product category analysis
* Sales profitability analysis
* Revenue and profit trends
* Discount vs. profit margin analysis
* AI-powered Analytics Assistant
* Natural-language analytics queries
* Separate AI assistants for customer, product, and sales analytics
* Loading, error, retry, and empty states
* Responsive dashboard layout
* Centralized API configuration
* INR currency and Indian number formatting
* Vercel deployment support

---

## Tech Stack

### Frontend

* **React 18** — UI library
* **TypeScript** — Type-safe development
* **Vite** — Frontend build tool and development server
* **React Router v6** — Client-side routing
* **Tailwind CSS** — Styling and responsive UI
* **Recharts** — Data visualization
* **Axios** — HTTP client
* **Lucide React** — Icons

### Backend Integration

* **FastAPI** — Backend API
* **REST APIs** — Communication between frontend and backend
* **OpenAI tool calling** — AI analytics handled by the backend

---

## Application Architecture

The frontend follows a frontend-only architecture where analytics processing is handled by the backend.

```text
                    User
                      |
                      v
             React Frontend
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
   Customer       Product         Sales
   Dashboard      Dashboard       Dashboard
        |             |             |
        +-------------+-------------+
                      |
                      v
                Axios Services
                      |
                      v
              FastAPI Backend
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
    Customer       Product         Sales
    Analytics      Analytics       Analytics
                      |
                      v
               Processed Data
```

### AI Analytics Flow

```text
User Question
      |
      v
React Analytics Assistant
      |
      v
AI Service
      |
      v
FastAPI AI Endpoint
      |
      v
Domain-specific AI Agent
      |
      v
OpenAI Tool Calling
      |
      v
Analytics Tool
      |
      v
Analytics Result
      |
      v
AI-generated Response
      |
      v
React Frontend
```

The frontend does not perform the analytics calculations. It displays the results returned by the backend.

---

## Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── layout/
│   │   └── Sidebar, Header, Layout shell
│   │
│   ├── common/
│   │   └── KpiCard, ChartCard, LoadingState,
│   │       ErrorState, EmptyState, SelectFilter,
│   │       ComingSoon, PageHeader, Skeleton
│   │
│   ├── charts/
│   │   └── Self-contained chart components
│   │
│   ├── dashboard/
│   │   └── Dashboard-specific components
│   │
│   └── ai/
│       └── AnalyticsAssistant, ChatMessage
│
├── pages/
│   └── One folder per application route
│
├── services/
│   ├── api.js
│   ├── customerService.js
│   └── aiService.js
│
├── hooks/
│   ├── useFetch
│   └── useMediaQuery
│
├── utils/
│   └── formatters.ts
│
├── constants/
│   ├── navigation.ts
│   ├── customerSegment.ts
│   └── chartTheme.ts
│
├── routes/
│   └── AppRoutes.tsx
│
├── types/
│   └── API response TypeScript contracts
│
├── App.tsx
└── main.tsx
```

### Directory Responsibilities

| Directory     | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| `components/` | Reusable UI, dashboard, chart, layout, and AI components |
| `pages/`      | Application pages corresponding to routes                |
| `services/`   | API communication and backend service functions          |
| `hooks/`      | Reusable React hooks                                     |
| `utils/`      | Formatting and utility functions                         |
| `constants/`  | Navigation, chart, and application constants             |
| `routes/`     | Application route configuration                          |
| `types/`      | TypeScript API response contracts                        |
| `assets/`     | Static frontend assets                                   |

---

## API Integration

All backend requests are routed through a centralized Axios instance.

```text
React Components
       |
       v
Service Layer
       |
       v
Axios
       |
       v
FastAPI Backend
```

The backend URL is configured using:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Feature-specific API calls are maintained in service files such as:

```text
src/services/customerService.js
src/services/aiService.js
```

The frontend does not hardcode the backend host inside individual API calls.

---

## API Endpoints

The frontend consumes the following backend endpoints.

### Customer Analytics

| Method | Endpoint                               | Description                    |
| ------ | -------------------------------------- | ------------------------------ |
| `GET`  | `/api/customer/total_customers`        | Total number of customers      |
| `GET`  | `/api/customer/churned_rate`           | Customer churn rate            |
| `GET`  | `/api/customer/avg_cust_spend`         | Average customer spending      |
| `GET`  | `/api/customer/avg_order_value`        | Average order value            |
| `GET`  | `/api/customer/monthly-signups`        | Monthly customer signup counts |
| `GET`  | `/api/customer/monthly-signups-gender` | Monthly signups by gender      |
| `GET`  | `/api/customer/signup-trend`           | Year-wise signup trend         |
| `GET`  | `/api/customer/churn`                  | Customer churn analysis        |
| `GET`  | `/api/customer/customer_segment`       | Customer segment analysis      |

### Product Analytics

| Method | Endpoint                               | Description                     |
| ------ | -------------------------------------- | ------------------------------- |
| `GET`  | `/api/products/total_units_sold`       | Total units sold                |
| `GET`  | `/api/products/total_products`         | Total number of products        |
| `GET`  | `/api/products/return_units`           | Total returned units            |
| `GET`  | `/api/products/avg_product_price`      | Average product price           |
| `GET`  | `/api/products/avg_product_cost`       | Average product cost            |
| `GET`  | `/api/products/top_10_products_sold`   | Top 10 products by units sold   |
| `GET`  | `/api/products/top_10_rev_products`    | Top 10 products by revenue      |
| `GET`  | `/api/products/top_10_categories_sold` | Top 10 categories by units sold |
| `GET`  | `/api/products/price_vs_unitsSold`     | Product price vs. units sold    |

### Sales Analytics

| Method | Endpoint                               | Description                            |
| ------ | -------------------------------------- | -------------------------------------- |
| `GET`  | `/api/sales/sales-kpis`                | Sales KPI metrics                      |
| `GET`  | `/api/sales/top-profit-margin`         | Top 10 products by profit margin       |
| `GET`  | `/api/sales/top-revenue`               | Top 10 products by revenue             |
| `GET`  | `/api/sales/top-profit`                | Top 10 products by profit              |
| `GET`  | `/api/sales/lowest-profit-margin`      | Products with the lowest profit margin |
| `GET`  | `/api/sales/loss-making-order-rate`    | Loss-making order analysis             |
| `GET`  | `/api/sales/discount-vs-profit-margin` | Discount vs. profit margin analysis    |
| `GET`  | `/api/sales/monthly_profit_by_year`    | Monthly profit by year                 |
| `GET`  | `/api/sales/monthly_revenue_by_year`   | Monthly revenue by year                |

### AI Analytics

| Method | Endpoint                | Description                  |
| ------ | ----------------------- | ---------------------------- |
| `POST` | `/api/ai/customer-chat` | Customer analytics assistant |
| `POST` | `/api/ai/product-chat`  | Product analytics assistant  |
| `POST` | `/api/ai/sales-chat`    | Sales analytics assistant    |

AI chat requests use a JSON body containing:

```json
{
  "question": "What is the average customer spend?",
  "chat_history": []
}
```

---

## Data Handling

The frontend does not calculate or invent analytics values.

The general flow is:

```text
Processed Data
      |
      v
FastAPI Backend
      |
      v
Analytics Functions
      |
      v
JSON API Response
      |
      v
React Frontend
      |
      v
Charts / KPIs / Tables
```

Analytics calculations remain in the backend, while the frontend is responsible for fetching, formatting, and displaying the returned results.

---

## Loading and Error Handling

Each chart and KPI component handles its own API request and UI state.

Components can display:

* Loading state
* Error state
* Retry action
* Empty state
* Analytics result

This allows individual API failures to be handled without preventing the rest of the dashboard from rendering.

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_TIMEOUT_MS=15000
```

### Variables

| Variable              | Description                           | Required |
| --------------------- | ------------------------------------- | -------- |
| `VITE_API_BASE_URL`   | Base URL of the FastAPI backend       | Yes      |
| `VITE_API_TIMEOUT_MS` | Axios request timeout in milliseconds | Optional |

### Security

Do not store API keys or other secrets in frontend environment variables.

In particular, an OpenAI API key must **never** be placed in the React application. AI credentials and other secrets belong in the backend.

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-frontend-repository-url>
cd <frontend-project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Configure the backend URL:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_TIMEOUT_MS=15000
```

### 4. Start the Backend

Make sure the FastAPI backend is running and accessible at the URL configured in `VITE_API_BASE_URL`.

### 5. Start the Frontend

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

The application runs at:

```text
http://localhost:5173
```

The frontend expects the FastAPI backend to be running and configured with CORS access for the frontend origin.

For example:

```text
Frontend
http://localhost:5173

        ↓

FastAPI Backend
http://127.0.0.1:8000
```

---

## Production Build

Create a production build using:

```bash
npm run build
```

The generated production files are placed in:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

## Deployment

The frontend can be deployed using Vercel.

### Deploy using Vercel

1. Push the frontend repository to GitHub.
2. Import the repository into Vercel.
3. Select the Vite framework preset.
4. Configure the build command:

```text
npm run build
```

5. Configure the output directory:

```text
dist
```

6. Add the required environment variables:

```text
VITE_API_BASE_URL
VITE_API_TIMEOUT_MS
```

7. Deploy the application.

The deployed frontend requires the FastAPI backend to be publicly accessible and configured to allow requests from the frontend domain through CORS.

### Vercel CLI

Alternatively:

```bash
npm install -g vercel
vercel
```

For production deployment:

```bash
vercel --prod
```

---

## Future Improvements

Potential future analytics modules include:

* Orders Analytics
* Shipments Analytics
* Payments Analytics
* Ratings & Reviews Analytics
* Order Items Analytics

These modules can be implemented using the existing service, component, routing, and dashboard architecture.

---

## Related Backend

The frontend is designed to work with the FastAPI backend of the Indian E-Commerce Analytics Platform.

```text
Frontend Repository
        |
        | REST API
        v
FastAPI Backend
        |
        v
Analytics / AI / Data Pipeline
```

Backend repository:

```text
<your-backend-repository-url>
```

---

# Indian E-Commerce Analytics Platform — Frontend

A React-based SaaS-style analytics dashboard for the **Indian E-Commerce Analytics Platform**.

This repository contains **only the frontend application**. It consumes JSON responses from the FastAPI backend through REST APIs and does not perform analytics calculations itself.

The application provides interactive dashboards for customer, product, and sales analytics, along with an AI-powered Analytics Assistant for natural-language analytics queries.

---

## Overview

The frontend provides an interactive interface for exploring e-commerce analytics through KPI cards, charts, tables, and other visualizations.

The application communicates with the FastAPI backend through REST APIs. The backend is responsible for data processing, analytics calculations, and AI-powered tool calling, while the frontend focuses on presenting the results and providing an interactive user experience.

The frontend also includes domain-specific Analytics Assistants for:

* Customer Analytics
* Product Analytics
* Sales Analytics

Users can ask natural-language questions through the Analytics Assistant, which sends the request to the backend AI layer for processing.

---

## Features

* Interactive e-commerce analytics dashboard
* Customer analytics dashboard
* Product analytics dashboard
* Sales analytics dashboard
* KPI cards for key business metrics
* Interactive charts and visualizations
* Customer segmentation analysis
* Customer churn analysis
* Customer signup trends
* Product sales analysis
* Product revenue analysis
* Product category analysis
* Sales profitability analysis
* Revenue and profit trends
* Discount vs. profit margin analysis
* AI-powered Analytics Assistant
* Natural-language analytics queries
* Separate AI assistants for customer, product, and sales analytics
* Loading, error, retry, and empty states
* Responsive dashboard layout
* Centralized API configuration
* INR currency and Indian number formatting
* Vercel deployment support

---

## Tech Stack

### Frontend

* **React 18** — UI library
* **TypeScript** — Type-safe development
* **Vite** — Frontend build tool and development server
* **React Router v6** — Client-side routing
* **Tailwind CSS** — Styling and responsive UI
* **Recharts** — Data visualization
* **Axios** — HTTP client
* **Lucide React** — Icons

### Backend Integration

* **FastAPI** — Backend API
* **REST APIs** — Communication between frontend and backend
* **OpenAI tool calling** — AI analytics handled by the backend

---

## Application Architecture

The frontend follows a frontend-only architecture where analytics processing is handled by the backend.

```text
                    User
                      |
                      v
             React Frontend
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
   Customer       Product         Sales
   Dashboard      Dashboard       Dashboard
        |             |             |
        +-------------+-------------+
                      |
                      v
                Axios Services
                      |
                      v
              FastAPI Backend
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
    Customer       Product         Sales
    Analytics      Analytics       Analytics
                      |
                      v
               Processed Data
```

### AI Analytics Flow

```text
User Question
      |
      v
React Analytics Assistant
      |
      v
AI Service
      |
      v
FastAPI AI Endpoint
      |
      v
Domain-specific AI Agent
      |
      v
OpenAI Tool Calling
      |
      v
Analytics Tool
      |
      v
Analytics Result
      |
      v
AI-generated Response
      |
      v
React Frontend
```

The frontend does not perform the analytics calculations. It displays the results returned by the backend.

---

## Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── layout/
│   │   └── Sidebar, Header, Layout shell
│   │
│   ├── common/
│   │   └── KpiCard, ChartCard, LoadingState,
│   │       ErrorState, EmptyState, SelectFilter,
│   │       ComingSoon, PageHeader, Skeleton
│   │
│   ├── charts/
│   │   └── Self-contained chart components
│   │
│   ├── dashboard/
│   │   └── Dashboard-specific components
│   │
│   └── ai/
│       └── AnalyticsAssistant, ChatMessage
│
├── pages/
│   └── One folder per application route
│
├── services/
│   ├── api.js
│   ├── customerService.js
│   └── aiService.js
│
├── hooks/
│   ├── useFetch
│   └── useMediaQuery
│
├── utils/
│   └── formatters.ts
│
├── constants/
│   ├── navigation.ts
│   ├── customerSegment.ts
│   └── chartTheme.ts
│
├── routes/
│   └── AppRoutes.tsx
│
├── types/
│   └── API response TypeScript contracts
│
├── App.tsx
└── main.tsx
```

### Directory Responsibilities

| Directory     | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| `components/` | Reusable UI, dashboard, chart, layout, and AI components |
| `pages/`      | Application pages corresponding to routes                |
| `services/`   | API communication and backend service functions          |
| `hooks/`      | Reusable React hooks                                     |
| `utils/`      | Formatting and utility functions                         |
| `constants/`  | Navigation, chart, and application constants             |
| `routes/`     | Application route configuration                          |
| `types/`      | TypeScript API response contracts                        |
| `assets/`     | Static frontend assets                                   |

---

## API Integration

All backend requests are routed through a centralized Axios instance.

```text
React Components
       |
       v
Service Layer
       |
       v
Axios
       |
       v
FastAPI Backend
```

The backend URL is configured using:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Feature-specific API calls are maintained in service files such as:

```text
src/services/customerService.js
src/services/aiService.js
```

The frontend does not hardcode the backend host inside individual API calls.

---

## API Endpoints

The frontend consumes the following backend endpoints.

### Customer Analytics

| Method | Endpoint                               | Description                    |
| ------ | -------------------------------------- | ------------------------------ |
| `GET`  | `/api/customer/total_customers`        | Total number of customers      |
| `GET`  | `/api/customer/churned_rate`           | Customer churn rate            |
| `GET`  | `/api/customer/avg_cust_spend`         | Average customer spending      |
| `GET`  | `/api/customer/avg_order_value`        | Average order value            |
| `GET`  | `/api/customer/monthly-signups`        | Monthly customer signup counts |
| `GET`  | `/api/customer/monthly-signups-gender` | Monthly signups by gender      |
| `GET`  | `/api/customer/signup-trend`           | Year-wise signup trend         |
| `GET`  | `/api/customer/churn`                  | Customer churn analysis        |
| `GET`  | `/api/customer/customer_segment`       | Customer segment analysis      |

### Product Analytics

| Method | Endpoint                               | Description                     |
| ------ | -------------------------------------- | ------------------------------- |
| `GET`  | `/api/products/total_units_sold`       | Total units sold                |
| `GET`  | `/api/products/total_products`         | Total number of products        |
| `GET`  | `/api/products/return_units`           | Total returned units            |
| `GET`  | `/api/products/avg_product_price`      | Average product price           |
| `GET`  | `/api/products/avg_product_cost`       | Average product cost            |
| `GET`  | `/api/products/top_10_products_sold`   | Top 10 products by units sold   |
| `GET`  | `/api/products/top_10_rev_products`    | Top 10 products by revenue      |
| `GET`  | `/api/products/top_10_categories_sold` | Top 10 categories by units sold |
| `GET`  | `/api/products/price_vs_unitsSold`     | Product price vs. units sold    |

### Sales Analytics

| Method | Endpoint                               | Description                            |
| ------ | -------------------------------------- | -------------------------------------- |
| `GET`  | `/api/sales/sales-kpis`                | Sales KPI metrics                      |
| `GET`  | `/api/sales/top-profit-margin`         | Top 10 products by profit margin       |
| `GET`  | `/api/sales/top-revenue`               | Top 10 products by revenue             |
| `GET`  | `/api/sales/top-profit`                | Top 10 products by profit              |
| `GET`  | `/api/sales/lowest-profit-margin`      | Products with the lowest profit margin |
| `GET`  | `/api/sales/loss-making-order-rate`    | Loss-making order analysis             |
| `GET`  | `/api/sales/discount-vs-profit-margin` | Discount vs. profit margin analysis    |
| `GET`  | `/api/sales/monthly_profit_by_year`    | Monthly profit by year                 |
| `GET`  | `/api/sales/monthly_revenue_by_year`   | Monthly revenue by year                |

### AI Analytics

| Method | Endpoint                | Description                  |
| ------ | ----------------------- | ---------------------------- |
| `POST` | `/api/ai/customer-chat` | Customer analytics assistant |
| `POST` | `/api/ai/product-chat`  | Product analytics assistant  |
| `POST` | `/api/ai/sales-chat`    | Sales analytics assistant    |

AI chat requests use a JSON body containing:

```json
{
  "question": "What is the average customer spend?",
  "chat_history": []
}
```

---

## Data Handling

The frontend does not calculate or invent analytics values.

The general flow is:

```text
Processed Data
      |
      v
FastAPI Backend
      |
      v
Analytics Functions
      |
      v
JSON API Response
      |
      v
React Frontend
      |
      v
Charts / KPIs / Tables
```

Analytics calculations remain in the backend, while the frontend is responsible for fetching, formatting, and displaying the returned results.

---

## Loading and Error Handling

Each chart and KPI component handles its own API request and UI state.

Components can display:

* Loading state
* Error state
* Retry action
* Empty state
* Analytics result

This allows individual API failures to be handled without preventing the rest of the dashboard from rendering.

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_TIMEOUT_MS=15000
```

### Variables

| Variable              | Description                           | Required |
| --------------------- | ------------------------------------- | -------- |
| `VITE_API_BASE_URL`   | Base URL of the FastAPI backend       | Yes      |
| `VITE_API_TIMEOUT_MS` | Axios request timeout in milliseconds | Optional |

### Security

Do not store API keys or other secrets in frontend environment variables.

In particular, an OpenAI API key must **never** be placed in the React application. AI credentials and other secrets belong in the backend.

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-frontend-repository-url>
cd <frontend-project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Configure the backend URL:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_TIMEOUT_MS=15000
```

### 4. Start the Backend

Make sure the FastAPI backend is running and accessible at the URL configured in `VITE_API_BASE_URL`.

### 5. Start the Frontend

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

The application runs at:

```text
http://localhost:5173
```

The frontend expects the FastAPI backend to be running and configured with CORS access for the frontend origin.

For example:

```text
Frontend
http://localhost:5173

        ↓

FastAPI Backend
http://127.0.0.1:8000
```

---

## Production Build

Create a production build using:

```bash
npm run build
```

The generated production files are placed in:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

## Deployment

The frontend can be deployed using Vercel.

### Deploy using Vercel

1. Push the frontend repository to GitHub.
2. Import the repository into Vercel.
3. Select the Vite framework preset.
4. Configure the build command:

```text
npm run build
```

5. Configure the output directory:

```text
dist
```

6. Add the required environment variables:

```text
VITE_API_BASE_URL
VITE_API_TIMEOUT_MS
```

7. Deploy the application.

The deployed frontend requires the FastAPI backend to be publicly accessible and configured to allow requests from the frontend domain through CORS.

### Vercel CLI

Alternatively:

```bash
npm install -g vercel
vercel
```

For production deployment:

```bash
vercel --prod
```

---

## Future Improvements

Potential future analytics modules include:

* Orders Analytics
* Shipments Analytics
* Payments Analytics
* Ratings & Reviews Analytics
* Order Items Analytics

These modules can be implemented using the existing service, component, routing, and dashboard architecture.

---

## Related Backend

The frontend is designed to work with the FastAPI backend of the Indian E-Commerce Analytics Platform.

```text
Frontend Repository
        |
        | REST API
        v
FastAPI Backend
        |
        v
Analytics / AI / Data Pipeline
```

Backend repository:

```text
<your-backend-repository-url>
```

---

## License

Add the project's license information here if a license has been selected for the repository.

