import Table from '../components/ui/Table';
import { useEffect, useState } from 'react';
import Loading from '../components/ui/Loading';
import { formatQueryDate } from '../utils/Common';
import NoDataFound from '../components/ui/NoDataFound';
import { RatingsData, TableConfig } from '../utils/Types';
import { getHistoricalRatings } from '../services/api/TradingEconomics';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

const CreditRating = () => {
    const [loading, setLoading] = useState(false);
    const [ratings, setRatings] = useState<RatingsData[]>([]);
    const [minDate, maxDate] = [new Date("1950-01-01"), new Date()];
    const sortedHeader = ['Country', 'Agency', 'Rating', 'Outlook', 'Date'];
    const config: TableConfig = { borderless: false, rounded: false, pagination: true };
    const [value, setValue] = useState<DateValueType>({ startDate: null, endDate: null });

    const fetchData = async () => {
        try {
            setLoading(true);
            setRatings(await getHistoricalRatings({
                startDate: formatQueryDate(value?.startDate ?? minDate),
                endDate: formatQueryDate(value?.endDate ?? maxDate)
            }));
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleValueChange = (newValue: DateValueType) => setValue(newValue);

    useEffect(() => { fetchData(); }, [value]);

    return (
        <>
            <div className='flex flex-col grow sm:mx-6 lg:mx-8'>
                <div className='bg-white h-12 flex items-center justify-between px-4'>
                    <div className='text-lg'>
                        Credit Ratings
                    </div>
                    <div className='w-[270px]'>
                        <Datepicker
                            primaryColor={'cyan'}
                            showFooter={true}
                            minDate={minDate}
                            maxDate={maxDate}
                            value={value}
                            startFrom={maxDate}
                            onChange={handleValueChange}
                        />
                    </div>
                </div>
                <div className='flex grow mb-6'>
                    {!loading ? (
                        ratings.length ?
                            <Table data={ratings} header={sortedHeader} config={config} className='bg-white' /> :
                            <NoDataFound header={sortedHeader} />
                    ) :
                        <Loading />
                    }
                </div>
            </div>
        </>
    );
};

export default CreditRating;
