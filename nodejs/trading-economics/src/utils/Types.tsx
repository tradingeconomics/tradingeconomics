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

export type SearchedData = {
    stance: string,
    info: SearchedInfoData,
    hits: SearchedHitsData[];
};

type SearchedInfoData = {
    facets: {
        type: FacetsData[],
        unit: FacetsData[],
        group: FacetsData[],
        country: FacetsData[],
        category: FacetsData[],
        currency: FacetsData[],
        frequency: FacetsData[];
    },
    hits: {
        value: string,
        relation: string;
    };
    page: number;
};

type FacetsData = {
    key: string,
    doc_count: number;
};

type SearchedHitsData = {
    s: string,
    unit: any,
    group: any,
    url: string,
    type: string,
    iids: string,
    esID: string,
    name: string,
    country: string,
    category: string,
    currency: string,
    frequency: string,
    importance: number,
    pretty_name: string;
};
