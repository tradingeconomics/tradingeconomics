import { checkDatesValidity } from '../../utils/Common';
import { HistoricalDataType, RatingsData, SearchedData } from '../../utils/Types';
import { AllowedCountries, HistoricalParams, HistoricalRatingParams, PeersParams, RatingParams } from './TradingEconomics.types';

const BaseURL = 'https://api.tradingeconomics.com';
const SearchURL = 'https://brains.tradingeconomics.com/v2/search/wb,fred,comtrade?pp=50&p=0&_=15579343524&stance=2';

const getKey = (): string => {
    let apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) apiKey = "guest:guest";

    if (apiKey !== "guest:guest" && apiKey.indexOf(":") < 0)
        throw new Error("Missing API key. Please set REACT_APP_API_KEY.");
    return apiKey;
};

const prepareRatingURL = (endPoint: string, param?: RatingParams | HistoricalRatingParams) => {
    const apiKey = getKey();
    let url = `${BaseURL}/credit-ratings${endPoint}`;

    if (param && param.country) {
        if (typeof param.country !== 'string')
            url += `/country/${encodeURIComponent(param.country.join(','))}`;
        else
            url += `/country/${encodeURIComponent(param.country)}`;
    }
    return url += `?c=${apiKey}`;
};

const getRatings = async (param?: RatingParams): Promise<RatingsData[]> => {
    let url = prepareRatingURL('', param);
    const response = await fetch(url);
    return await response.json();
};

const getHistoricalRatings = async (param: HistoricalRatingParams): Promise<RatingsData[]> => {
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

const getPeers = async (param: PeersParams) => {
    const apiKey = getKey();
    let url = `${BaseURL}`;

    if (typeof param === 'string')
        url += `/peers/${encodeURIComponent(param)}`;
    else {
        url += `/peers/country/${encodeURIComponent(param.country)}`;
        if (param.category) url += `/${encodeURIComponent(param.category)}`;
    }
    url += `?c=${apiKey}`;

    const response = await fetch(url);
    return await response.json();
};

const getHistoricalData = async (param: HistoricalParams): Promise<HistoricalDataType[]> => {
    const apiKey = getKey();
    let url = `${BaseURL}/historical/country`;

    if (typeof param.country !== 'string')
        url += `/${encodeURIComponent(param.country.join(','))}`;
    else
        url += `/${encodeURIComponent(param.country)}`;

    if (typeof param.indicator !== 'string')
        url += `/indicator/${encodeURIComponent(param.indicator.join(','))}`;
    else
        url += `/indicator/${encodeURIComponent(param.indicator)}`;

    if (param.startDate) url += `/${param.startDate}`;
    if (param.startDate && param.endDate) url += `/${param.endDate}`;
    if (!param.startDate && param.endDate) throw new Error("Can't use only the EndDate.");

    // if (param.ticker && param.startDate) url = `/historical/ticker/${param.ticker}/${param.startDate}`;

    url += `?c=${apiKey}`;
    const response = await fetch(url);
    return await response.json();
};


const getDiscontinuedIndicators = async (country?: AllowedCountries | AllowedCountries[]) => {
    const apiKey = getKey();
    let countryList = '/all';
    if (country?.length) {
        if (typeof country !== 'string')
            countryList = `/${encodeURIComponent(country.join(','))}`;
        else
            countryList = `/${encodeURIComponent(country)}`;
    }
    const url = `${BaseURL}/country/${countryList}/discontinued?c=${apiKey}`;
    const response = await fetch(url);
    return await response.json();
};

const getHistoricalUpdates = async () => {
    const apiKey = getKey();
    const url = `${BaseURL}/historical/updates?c=${apiKey}`;
    const response = await fetch(url);
    return await response.json();
};

const getAllCountries = async () => {
    const apiKey = getKey();
    const url = `${BaseURL}/country?c=${apiKey}`;
    const response = await fetch(url);
    return await response.json();
};

const getAvailableIndicators = async (calendar?: boolean) => {
    const apiKey = getKey();
    const url = `${BaseURL}/indicators?c=${apiKey}${calendar ? '&calendar=1' : ''}`;
    const response = await fetch(url);
    return await response.json();
};

const searchData = async (searchParam: string): Promise<SearchedData> => {
    const url = `${SearchURL}&q=${searchParam}`;
    const response = await fetch(url);
    return await response.json();
};

export {
    getPeers,
    searchData,
    getRatings,
    getAllCountries,
    getHistoricalData,
    getHistoricalUpdates,
    getHistoricalRatings,
    getAvailableIndicators,
    getDiscontinuedIndicators
};
