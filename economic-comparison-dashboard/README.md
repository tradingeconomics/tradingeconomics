# 🌍 Global Economy Dashboard

A powerful yet simple dashboard to explore and compare country-level economic data using interactive visualizations and real-time API data.

## ✨ Features



## 🚀 Getting Started

1. **Clone the repository**
	```bash
	git clone https://github.com/jaswanthsai7/global-economy-dashboard.git
	cd global-economy-dashboard
	```

2. **Install dependencies**
	```bash
	npm install
	# or
	yarn install
	```

3. **Set up environment variables**
	- Create a `.env.local` file in the root directory.
	- Add the following variables (replace with your actual TradingEconomics API key and base URL):
	  ```env
	  NEXT_PUBLIC_API_BASE_URL=https://api.tradingeconomics.com
	  NEXT_PUBLIC_API_KEY=your_api_key_here
	  ```

4. **Run the development server**
	```bash
	npm run dev
	# or
	yarn dev
	```
	Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

5. **Build for production**
	```bash
	npm run build
	npm start
	# or
	yarn build
	yarn start
	```

## 📁 Folder Structure

economic-comparison-dashboard/
├── src/
│   ├── app/
│   │   ├── page.js              → Main landing UI (fetches and displays data)
│   │   ├── layout.js            → App layout and global wrappers
│   │   ├── globals.css          → Tailwind + global styles
│   │   ├── compare/page.jsx     → Country comparison page
│   │   ├── search/page.jsx      → Search page for countries/indicators
│   │   └── visualize/page.jsx   → Visualization page (charts, etc.)
│   ├── components/
│   │   ├── CountrySelector.jsx      → Dropdown for selecting countries
│   │   ├── IndicatorCard.jsx        → Reusable UI card for indicator display
│   │   ├── InputSelect.jsx          → Custom select input component
│   │   ├── LineChartWithHeading.jsx → Chart with heading
│   │   ├── Navbar.jsx               → Top navigation bar
│   │   ├── PopupModal.jsx           → Modal for popups
│   │   ├── ResultsTable.jsx         → Table for displaying results
│   │   ├── SearchPanel.jsx          → Search/filter panel
│   │   ├── ShimmerGrid.jsx          → Loading shimmer grid
│   │   └── TimeSeriesModal.jsx      → Modal for time series data
│   ├── lib/
│   │   └── constants.js             → Constant values (API endpoints, country lists, etc.)
│   └── services/
│       ├── apiClient.js             → Global Axios instance
│       ├── countryService.js        → API: Fetch country data
│       ├── historicalService.js     → API: Fetch historical data
│       ├── indicatorService.js      → API: Fetch economic indicators
│       └── searchService.js         → API: Search functionality
├── public/
│   ├── favicon.ico
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .env.local                  → Contains NEXT_PUBLIC_API_BASE_URL and NEXT_PUBLIC_API_KEY
├── tailwind.config.mjs         → Tailwind setup
├── next.config.mjs             → Next.js config
├── package.json                → Project dependencies and scripts
└── README.md                   → Project documentation
