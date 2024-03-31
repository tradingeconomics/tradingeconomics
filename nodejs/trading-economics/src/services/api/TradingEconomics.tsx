import { RatingsData } from '../../utils/Types';
import { checkDatesValidity } from '../../utils/Common';

type AllowedCountries = 'Mexico' | 'New Zealand' | 'Thailand' | 'Sweden';

type RatingApiParams = {
    country?: AllowedCountries | AllowedCountries[];
};

type HistoricalApiParams = {
    endDate: string,
    startDate: string,
    country?: AllowedCountries | AllowedCountries[];
};

const getKey = (): string => {
    let apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) apiKey = "guest:guest";

    if (apiKey !== "guest:guest" && apiKey.indexOf(":") < 0)
        throw new Error("Missing API key. Please set REACT_APP_API_KEY.");
    return apiKey;
};

const getBaseURL = (): string => {
    const url = process.env.REACT_APP_BASE_URL;
    if (!url) throw new Error("Missing Base URL. Please set REACT_APP_BASE_URL.");
    return url;
};

const prepareRatingURL = (endPoint: string, param?: RatingApiParams | HistoricalApiParams) => {
    const apiKey = getKey();
    const baseUrl = getBaseURL();
    let url = `${baseUrl}/credit-ratings${endPoint}`;
    if (param && param.country) {
        if (typeof param.country !== 'string')
            url += `/country/${encodeURIComponent(param.country.join(','))}`;
        else
            url += `/country/${encodeURIComponent(param.country)}`;
    }
    return url += `?c=${apiKey}`;
};

const getRatings = async (param?: RatingApiParams): Promise<RatingsData[]> => {
    let url = prepareRatingURL('', param);
    const response = await fetch(url);
    return await response.json();
};

const getHistoricalRatings = async (param: HistoricalApiParams): Promise<RatingsData[]> => {
    let url = prepareRatingURL('/historical', param);

    if (param && (param.startDate || param.endDate)) {
        try {
            url = checkDatesValidity(url, param.startDate, param.endDate);
        } catch (err) {
            throw err;
        }
    }

    const response = await fetch(url);
    return await response.json();
};

export {
    getRatings,
    getHistoricalRatings
};
