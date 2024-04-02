import CreditRating from '../pages/CreditRating';
import HistoricalData from '../pages/HistoricalData';

const RoutesList = [
    { path: '/historical-data', element: <HistoricalData /> },
    { path: '/credit-rating', element: <CreditRating /> }
];

export { RoutesList };
