import CreditRating from '../pages/CreditRating';
import HistoricalData from '../pages/HistoricalData';
import HistoricalDataByIndicator from '../pages/HistoricalDataByIndicator';

const RoutesList = [
    { path: '/credit-rating', element: <CreditRating /> },
    { path: '/historical-data', element: <HistoricalData /> },
    { path: '/historical-data-indicator', element: <HistoricalDataByIndicator /> }
];

export { RoutesList };
