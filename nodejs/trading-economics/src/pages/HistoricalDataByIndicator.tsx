import Table from '../components/ui/Table';
import { useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import Loading from '../components/ui/Loading';
import DropDown from '../components/ui/DropDown';
import NoDataFound from '../components/ui/NoDataFound';
import MultiSelect from '../components/ui/MultiSelect';
import { AllowedCountries } from '../services/api/TradingEconomics.types';
import { ChartDataByIndicators, HistoricalDataType, TableConfig } from '../utils/Types';
import { getAvailableIndicators, getHistoricalData } from '../services/api/TradingEconomics';
import { AllAllowedCountriesList, MonthList, formatDate, formatQueryDate, getYearsList } from '../utils/Common';

type HistoricalDataPage = {
    data: HistoricalDataType[],
    chartData: ChartDataByIndicators[];
};

const PrepareData = (data: HistoricalDataType[], selectedYear: string): HistoricalDataPage => {
    let transformedData: HistoricalDataType[] = [];
    const chartData: ChartDataByIndicators[] = [];
    const totalMonths = new Date().getFullYear().toString() === selectedYear ? new Date().getMonth() : 12;

    for (let i = 0; i < totalMonths; i++)
        chartData.push({ Index: MonthList[i] });

    transformedData = data.map(ele => {
        const month = new Date(ele.DateTime).getMonth();
        chartData[month][ele.Category] = ele.Value;
        return {
            ...ele,
            DateTime: formatDate(ele.DateTime),
            LastUpdate: formatDate(ele.LastUpdate)
        };
    });

    return {
        data: transformedData,
        chartData: chartData
    };
};

const HistoricalDataByIndicator = () => {
    const [year, setYear] = useState('2024');
    const [loading, setLoading] = useState(false);
    const [indicators, setIndicators] = useState<string[]>([]);
    const [country, setCountry] = useState<AllowedCountries>('Mexico');
    const [selectedIndicators, setSelectedIndicators] = useState(['Fiscal Expenditure']);
    const config: TableConfig = { borderless: false, rounded: true, pagination: true };
    const [historicalData, setHistoricalData] = useState<HistoricalDataPage>({ data: [], chartData: [] });
    const sortedHeader = ['Country', 'Category', 'DateTime', 'Frequency', 'HistoricalDataSymbol', 'LastUpdate', 'Value'];

    const fetchIndicators = async () => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1100));
            const response = await getAvailableIndicators();
            setIndicators(response.map((obj: any) => obj.Category));
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getHistoricalData({
                country: country,
                indicator: selectedIndicators,
                startDate: formatQueryDate(`${year}-01-01`),
                endDate: formatQueryDate(`${year}-12-31`),
            });
            response.pop();
            setHistoricalData(PrepareData(response, year));
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleYearChange = (selected: string) => setYear(selected);
    const handleIndicatorChange = (selected: string[]) => setSelectedIndicators(selected);
    const handleCountryChange = (selected: string) => setCountry(selected as AllowedCountries);

    useEffect(() => { fetchIndicators(); }, []);

    useEffect(() => { fetchData(); }, [country, year, selectedIndicators]);

    return (
        <>
            <div className='flex flex-col grow sm:mx-6 lg:mx-8 gap-3'>
                <div className='bg-white h-12 flex items-center justify-between px-4'>
                    <div className='text-lg'>
                        Compare Indicators
                    </div>
                    <div className='flex gap-5'>
                        <DropDown label='Country:' defaultValue='Mexico' options={AllAllowedCountriesList} onChange={handleCountryChange}
                            className='w-28' />
                        <DropDown label='Year:' defaultValue='2024' options={getYearsList(1980)} onChange={handleYearChange}
                            className='w-28' />
                        <MultiSelect label='Categories:' defaultValue={['Fiscal Expenditure']} options={indicators} onChange={handleIndicatorChange}
                            className='w-48' />
                    </div>
                </div>
                {!loading ? (
                    historicalData.data.length ?
                        <div className='flex flex-col gap-5 rounded-lg'>
                            <div className='h-[560px] bg-white'>
                                <BarChart
                                    keys={selectedIndicators}
                                    data={historicalData.chartData}
                                    leftLabel='Month'
                                    bottomLabel='Value'
                                    chartLabel='Historical Data' />
                            </div>
                            <div className='flex grow mb-6'>
                                <Table data={historicalData.data} header={sortedHeader} config={config} pageSize={100} className='bg-white' />
                            </div>
                        </div> :
                        <NoDataFound header={sortedHeader} />
                ) :
                    <Loading />
                }
            </div>
        </>
    );
};

export default HistoricalDataByIndicator;
