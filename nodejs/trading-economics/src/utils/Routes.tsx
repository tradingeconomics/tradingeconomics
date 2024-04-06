import Search from '../pages/Search';
import CreditRating from '../pages/CreditRating';
import HistoricalData from '../pages/HistoricalData';
import HistoricalDataByIndicator from '../pages/HistoricalDataByIndicator';
import { Navigate } from 'react-router-dom';

const RoutesList = [
    { path: '/search', element: <Search /> },
    { path: '/credit-rating', element: <CreditRating /> },
    { path: '/', element: <Navigate to="/search" replace /> },
    { path: '/historical-data', element: <HistoricalData /> },
    { path: '/historical-data-indicator', element: <HistoricalDataByIndicator /> }
];

export { RoutesList };
