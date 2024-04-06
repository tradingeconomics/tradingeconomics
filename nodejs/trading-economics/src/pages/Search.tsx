import Table from '../components/ui/Table';
import { useEffect, useState } from 'react';
import Loading from '../components/ui/Loading';
import { getYearsList } from '../utils/Common';
import DropDown from '../components/ui/DropDown';
import NoDataFound from '../components/ui/NoDataFound';
import { SearchedData, TableConfig } from '../utils/Types';
import { getAllCountries, searchData } from '../services/api/TradingEconomics';

const Search = () => {
    const [year, setYear] = useState('2024');
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState('Mexico');
    const [countries, setCountries] = useState<string[]>([]);
    const config: TableConfig = { borderless: false, rounded: true, pagination: true };
    const [searchedData, setSearchedData] = useState<SearchedData>();
    const sortedHeader = ['country', 'category', 'name', 'type', 'currency', 'frequency', 'importance'];

    const fetchIndicators = async () => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1100));
            const response = await getAllCountries();
            setCountries(response.map((obj: any) => obj.Category));
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await searchData(country);
            setSearchedData(response);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleYearChange = (selected: string) => setYear(selected);
    const handleIndicatorChange = (selected: string) => setCountry(selected);

    useEffect(() => { fetchIndicators(); }, []);

    useEffect(() => { fetchData(); }, [year, country]);

    return (
        <>
            <div className='flex flex-col grow sm:mx-6 lg:mx-8 gap-3'>
                <div className='bg-white h-12 flex items-center justify-between px-4'>
                    <div className='text-lg'>
                        Compare Countries
                    </div>
                    <div className='flex gap-5'>
                        <DropDown label='Year:' defaultValue='2024' options={getYearsList(1980)} onChange={handleYearChange}
                            className='w-28' />
                        <DropDown label='Category:' defaultValue='Mexico' options={countries} onChange={handleIndicatorChange}
                            className='w-48' />
                    </div>
                </div>
                {!loading ? (
                    searchedData?.hits.length ?
                        <div className='flex grow mb-6'>
                            <Table data={searchedData.hits} header={sortedHeader} config={config} pageSize={100} className='bg-white' />
                        </div> :
                        <NoDataFound header={sortedHeader} />
                ) :
                    <Loading />
                }
            </div>
        </>
    );
};

export default Search;
