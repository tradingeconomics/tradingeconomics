export type AllowedCountries = 'Mexico' | 'New Zealand' | 'Thailand' | 'Sweden';

export type RatingParams = {
    country?: AllowedCountries | AllowedCountries[];
};

export type HistoricalRatingParams = {
    endDate: string,
    startDate: string,
    country?: AllowedCountries | AllowedCountries[];
};

export type HistoricalParams = {
    endDate?: string,
    startDate?: string,
    indicator: string | string[],
    country: AllowedCountries | AllowedCountries[];
};

export type PeersParams = string | {
    category?: string,
    country: AllowedCountries;
}; 
