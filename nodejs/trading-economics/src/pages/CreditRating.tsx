import Table from '../components/ui/Table';
import { useEffect, useState } from 'react';
import { formatDate } from '../utils/Common';
import { RatingsData, TableConfig } from '../utils/Types';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import { getHistoricalRatings } from '../services/api/TradingEconomics';
import NoDataFound from '../components/ui/NoDataFound';

const CreditRating = () => {
    const [ratings, setRatings] = useState<RatingsData[]>([]);
    const [minDate, maxDate] = [new Date("1950-01-01"), new Date()];
    const sortedHeader = ['Country', 'Agency', 'Rating', 'Outlook', 'Date'];
    const config: TableConfig = { borderless: false, rounded: true, pagination: true };
    const [value, setValue] = useState<DateValueType>({ startDate: null, endDate: null });

    const fetchData = async () => {
        try {
            setRatings(await getHistoricalRatings({
                startDate: formatDate(value?.startDate ?? minDate),
                endDate: formatDate(value?.endDate ?? maxDate)
            }));

        } catch (error) {
            console.error(error);
        }
    };

    const handleValueChange = (newValue: DateValueType) => {
        setValue(newValue);
    };

    useEffect(() => { fetchData(); }, [value]);

    return (
        <>
            <div className='flex flex-col grow'>
                <div className='bg-white sm:mx-6 lg:mx-8 h-12 flex items-center justify-between px-4'>
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
                    {ratings.length ?
                        <Table data={ratings} header={sortedHeader} config={config} className='bg-white' /> :
                        <NoDataFound header={sortedHeader} />
                    }
                </div>
            </div>
        </>
    );
};

export default CreditRating;
