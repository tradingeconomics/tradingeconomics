# GDP Comparison Tool
## Trading Economics Developer Challenge Submission

A React-based web application that allows users to compare GDP (Gross Domestic Product) data across multiple countries using the Trading Economics API.

![GDP Comparison Tool](https://img.shields.io/badge/React-18.x-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-green) ![Trading Economics](https://img.shields.io/badge/API-Trading%20Economics-orange)

## 🚀 Features

- **Interactive Country Selection**: Add up to 4 countries for comparison
- **Real-time GDP Data**: Fetches historical GDP data from Trading Economics API
- **Visual Comparison**: Dynamic line chart showing GDP trends over the last 10 years
- **Current GDP Stats**: Display latest GDP figures with formatted values (Trillions, Billions)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Graceful fallback to mock data when API is unavailable
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🛠️ Technology Stack

- **Frontend**: React 18.x with Hooks
- **Styling**: Tailwind CSS
- **Charts**: Recharts library
- **Icons**: Lucide React
- **API**: Trading Economics REST API
- **HTTP Client**: Axios

## 📁 Project Structure

```
src/
├── App.js                    # Main application component
├── services/
│   └── apiService.js         # API calls & data processing
└── components/
    ├── CountryControls.js    # Country selection & stats
    └── GDPChart.js          # Chart visualization
```

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/piyush-khanna-qmb/tradingeconomics.git
   cd tradingeconomics/gdp-comparison-tool
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

The Trading Economics API key is configured in `src/services/apiService.js`. The application includes:

- CORS proxy for development testing
- Fallback mock data for demonstration
- Error handling for API failures
- Multiple endpoint attempts for data retrieval

## 📊 API Integration

This project integrates with Trading Economics API endpoints:

- `GET /historical/country/{country}/indicator/gdp` - Historical GDP data
- Supports multiple countries simultaneously
- Automatic data processing and formatting
- 10-year historical data display

## 🎯 Key Implementation Details

- **Modular Architecture**: Clean separation of concerns across components
- **State Management**: React hooks for efficient state handling  
- **Data Processing**: Automatic formatting of GDP values (T, B, M suffixes)
- **Responsive Charts**: Dynamic scaling based on data ranges
- **Color Coding**: Unique colors for each country in visualizations
- **Loading States**: User-friendly loading indicators
- **Mock Data Fallback**: Ensures functionality even without API access

## 🌟 Features Demonstrated

1. **API Integration**: Trading Economics historical data endpoints
2. **Data Visualization**: Interactive charts with custom tooltips
3. **User Interface**: Modern, responsive design with intuitive controls
4. **Error Handling**: Graceful degradation and user feedback
5. **Code Organization**: Clean, maintainable component structure

## 📈 Sample Countries Available

United States, China, Japan, Germany, India, United Kingdom, France, Italy, Brazil, Canada, Russia, South Korea, Spain, Australia, Mexico, Indonesia, Netherlands, Turkey, and more.

## 🔗 Live Demo

The application provides immediate visual feedback and allows real-time comparison of economic data across selected countries.

## 📝 Assignment Requirements Met

✅ Trading Economics developer account created  
✅ GitHub repository forked and updated  
✅ API documentation reviewed and implemented  
✅ Search functionality explored  
✅ Web application built using available endpoints  
✅ Historical time series data implemented  
✅ Country comparison functionality  
✅ Professional code structure and documentation  

## 👨‍💻 Developer

Built as part of the Trading Economics Developer Challenge - demonstrating proficiency in React development, API integration, and data visualization.

---

**Contact**: piyushkhannavb@gmail.com 
**GitHub**: https://github.com/piyush-khanna-qmb/
**Date**: 10 September, 2025