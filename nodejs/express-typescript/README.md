# Mexico vs Thailand Car Registration Comparison

A web application which visualizes and compares car registration data for Mexico and Thailand using interactive charts and statistics. This single chart(only one chart exists) has so much to say with the power of data.

## Prerequisites

-   Node.js >= 18.0.0
-   pnpm (recommended) or npm

## Setup

1. **Clone and install dependencies:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    pnpm install
    ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory:

    ```env
    NODE_ENV=development
    PORT=3000
    API_KEY=your_trading_economics_api_key
    TRADING_ECONOMICS_BASE_URL=https://api.tradingeconomics.com
    MEXICO_ENDPOINT=/historical/ticker/MEXICOCARREG/2000-01-01
    THAILAND_ENDPOINT=/historical/ticker/THAILANDCARREG/2000-01-01
    ```

## Development

```bash
pnpm dev
```

Visit: http://localhost:3000/charts

## Production

```bash
pnpm prod
```

## Scripts

-   `pnpm dev` - Development server with hot reload
-   `pnpm build` - Build for production
-   `pnpm prod` - Build and run production server
-   `pnpm start` - Start development server

## Features

-   Interactive chart visualization
-   Date range filtering (presets and custom range)
-   Data aggregation or density (monthly, quarterly, yearly)
-   Seasonal pattern observations
-   TE API response caching
-   Rate limit handling with retry logic and expotential backoff

## Tech Stack

-   **Backend:** Node.js, Express, TypeScript
-   **Frontend:** Vanilla JavaScript, Chart.js
-   **Templating:** EJS
-   **Validation:** Zod
-   **HTTP Client:** Axios
