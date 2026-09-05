import { Navigate } from 'react-router-dom';
import CreditRating from '../pages/CreditRating';
import HistoricalData from '../pages/HistoricalData';
import HistoricalDataByIndicator from '../pages/HistoricalDataByIndicator';

const RoutesList = [
    { path: '/credit-rating', element: <CreditRating /> },
    { path: '/historical-data-country', element: <HistoricalData /> },
    { path: '/', element: <Navigate to="/credit-rating" replace /> },
    { path: '/historical-data-indicator', element: <HistoricalDataByIndicator /> }
];

export default RoutesList;
