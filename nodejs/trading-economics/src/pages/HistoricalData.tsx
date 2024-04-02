import Table from '../components/ui/Table';
import { useEffect, useState } from 'react';
import DropDown from '../components/ui/DropDown';
import { RatingsData, TableConfig } from '../utils/Types';
import { AllowedCountries } from '../services/api/TradingEconomics.types';
import { AllowedCountriesList, formatDate, getYearsList } from '../utils/Common';
import { getAvailableIndicators, getHistoricalData } from '../services/api/TradingEconomics';
import NoDataFound from '../components/ui/NoDataFound';

const HistoricalData = () => {
    const [year, setYear] = useState('2024');
    const [indicators, setIndicators] = useState<string[]>([]);
    const [indicator, setIndicator] = useState('Fiscal Expenditure');
    const [historicalData, setHistoricalData] = useState<RatingsData[]>([]);
    const [selectedCountries, setSelectedCountries] = useState(['Mexico', 'Thailand']);
    const config: TableConfig = { borderless: false, rounded: true, pagination: true };
    const sortedHeader = ['Country', 'Category', 'DateTime', 'Frequency', 'HistoricalDataSymbol', 'LastUpdate', 'Value'];

    const fetchIndicators = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1100));
            const response = await getAvailableIndicators();
            setIndicators(response.map((obj: any) => obj.Category));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchData = async () => {
        try {
            const response = await getHistoricalData({
                country: selectedCountries as AllowedCountries[],
                indicator,
                startDate: formatDate(`${year}-01-01`),
                endDate: formatDate(`${year}-12-31`),
            });
            response.pop();
            setHistoricalData(response);
        } catch (err) {
            console.error(err);
        }
    };

    const handleYearChange = (selected: string) => {
        console.log(selected);
        setYear(selected);
    };
    const handleIndicatorChange = (selected: string) => setIndicator(selected);
    const handleCountryChange = (country1: string, country2: string) => setSelectedCountries([country1, country2]);

    useEffect(() => { fetchIndicators(); }, []);

    useEffect(() => { fetchData(); }, [selectedCountries, year, indicator]);

    return (
        <>
            <div className='flex flex-col grow'>
                <div className='bg-white sm:mx-6 lg:mx-8 h-12 flex items-center justify-between px-4'>
                    <div className='text-lg'>
                        Historical Data
                    </div>
                    <div className='flex gap-5'>
                        <div className=' flex gap-3'>
                            <DropDown label='Compare:' defaultValue='Mexico' options={AllowedCountriesList}
                                onChange={(selected) => handleCountryChange(selected, selectedCountries[1])} />
                            <DropDown label='' defaultValue='Thailand' options={AllowedCountriesList}
                                onChange={(selected) => handleCountryChange(selectedCountries[0], selected)} />
                        </div>
                        <DropDown label='Year:' defaultValue='2024' options={getYearsList(1980)} onChange={handleYearChange}
                            className='w-28' />
                        <DropDown label='Category:' defaultValue='Fiscal Expenditure' options={indicators} onChange={handleIndicatorChange}
                            className='w-48' />
                    </div>
                </div>
                <div className='flex grow mb-6'>
                    {historicalData.length ?
                        <Table data={historicalData} header={sortedHeader} config={config} pageSize={100} className='bg-white' /> :
                        <NoDataFound header={sortedHeader} />
                    }
                </div>
            </div>
        </>
    );
};

export default HistoricalData;
