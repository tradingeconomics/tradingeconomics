export type RatingsData = {
    [key: string]: string;
};

export type Indicator = {
    Category: string,
    CategoryGroup: string;
};

export type TableConfig = {
    rounded?: boolean,
    pagination?: boolean,
    borderless?: boolean,
};

export type ChartDataByCountry = {
    Index: string,
    Mexico: number,
    Sweden: number,
    Thailand: number;
};

export type ChartDataByIndicators = {
    [x: string]: string | number;
};

export type HistoricalDataType = {
    Value: number,
    Country: string,
    Category: string,
    DateTime: string,
    Frequency: string,
    LastUpdate: string,
    HistoricalDataSymbol: string;
};
