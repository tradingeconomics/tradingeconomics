// import * as http from 'http';
import * as TE from 'tradingeconomics';
import { useEffect, useState } from 'react';

const CreditRating = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            await TE.login(process.env.REACT_APP_API_KEY);
            const response = await TE.getRatings();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchData(); }, []);

    return (
        <></>
    );
};

export default CreditRating;
