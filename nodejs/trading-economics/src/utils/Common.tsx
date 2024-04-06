import { DateError } from './CustomErrors';

const AllowedCountriesList = ['Mexico', 'Thailand', 'Sweden'];
const AllAllowedCountriesList = [...AllowedCountriesList, 'New Zealand'];
const MonthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const checkDatesValidity = (baseLink: string, start_date: string | undefined, end_date: string | undefined) => {
    if (start_date && !end_date) {
        try {
            if (isValid(start_date))
                throw new DateError('Incorrect StartDate format, should be YYYY-MM-DD.');
            baseLink += `&d1=${encodeURIComponent(start_date)}`;
        } catch (err) {
            throw new DateError('Incorrect StartDate format, should be YYYY-MM-DD.');
        }
    }
    else if (start_date && end_date) {
        try {
            if (!isValid(start_date))
                throw new DateError('Incorrect StartDate format, should be YYYY-MM-DD.');
            if (!isValid(end_date))
                throw new DateError('Incorrect EndDate format, should be YYYY-MM-DD or MM-DD-YYYY.');
            const endDateObj = new Date(end_date);
            const startDateObj = new Date(start_date);
            if (startDateObj > endDateObj)
                throw new DateError('StartDate must be earlier than EndDate.');

            baseLink += `&d1=${encodeURIComponent(start_date)}&d2=${encodeURIComponent(end_date)}`;
        } catch (err: any) {
            throw new DateError(err.message);
        }
    }
    else if (!start_date && end_date) {
        throw new DateError('StartDate value is missing.');
    }

    return baseLink;
};

const isValid = (date: string) => {
    try {
        try {
            new Date(date + 'T00:00:00Z');
        } catch {
            new Date(date);
        }
        return true;
    } catch {
        throw new DateError("Incorrect data format, should be YYYY-MM-DD");
    }
};

const formatQueryDate = (date: Date | string) => {
    if (typeof date === 'string') date = new Date(date);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const formatDate = (date: Date | string) => {
    if (typeof date === 'string') date = new Date(date);

    const hours = date.getHours();
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours % 12 || 12}:${minutes}:${seconds} ${hours >= 12 ? 'PM' : 'AM'}`;
};

const getYearsList = (startingYear: number) => {
    let yearsOption = [];
    const currentYear = new Date().getFullYear();

    for (let i = startingYear; i <= currentYear; i++)
        yearsOption.push(i.toString());
    return yearsOption;
};

export {
    MonthList,
    formatDate,
    getYearsList,
    formatQueryDate,
    checkDatesValidity,
    AllowedCountriesList,
    AllAllowedCountriesList
};
