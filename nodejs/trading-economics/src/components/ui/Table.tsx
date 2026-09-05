import { useEffect, useState } from 'react';
import { TableConfig } from '../../utils/Types';
import { toTitleCase } from '../../utils/Common';

type Props = {
    data: PageData;
    header: string[],
    [x: string]: any,
    pageSize?: number,
    config?: TableConfig;
};

type PageData = { [x: string]: any; }[];

const defaultConfig: TableConfig = {
    rounded: false,
    borderless: true,
    pagination: false
};


const getPaginationButtons = (totalPages: number, currentPage: number, handleChange: (page: number) => void) => {
    let buttons: JSX.Element[] = [];

    for (let i = 1; i <= totalPages; i++) {
        buttons.push(
            <button key={i} type="button" aria-current="page" onClick={() => handleChange(i)}
                className={`${currentPage === i ? 'bg-secondary' : 'hover:bg-opacity-60'} min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-secondary py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none`}>
                {i}
            </button>
        );
    }
    return buttons;
};

export default function Table({ data, header, config, pageSize = 12, ...props }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageData, setPageData] = useState<PageData>();
    const { rounded, borderless, pagination } = config ?? defaultConfig;
    const totalPages = Math.floor(data.length / pageSize) + (data.length % pageSize !== 0 ? 1 : 0);

    const handleCurrentPage = (page: number) => setCurrentPage(page);

    const handlePrevious = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
    };

    const currentPageData = () => {
        const start = (currentPage - 1) * pageSize;
        setPageData(data.slice(start, start + pageSize));
    };

    useEffect(() => currentPageData(), [currentPage]);

    return (
        <div className="grow overflow-auto max-w-[1374px]">
            <div className="flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className={`${!borderless && 'border'} ${rounded && 'rounded-lg'} border-gray-200 overflow-hidden`}>
                            <table className={`min-w-full divide-y divide-gray-200 ${props.className}`}>
                                <thead className='bg-gray-pure'>
                                    <tr>
                                        {header.map((title, index) => (
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-light"
                                                scope="col" key={index}>
                                                {toTitleCase(title)}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {!!pageData?.length && pageData.map((el, index) => (
                                        <tr key={index} className='hover:bg-gray-pure'>
                                            {header.map((key, index) => (
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-primary-light"
                                                    key={index} title={el[key]}>
                                                    {el[key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {!!pagination && !!(totalPages > 1) &&
                                <div className="py-1 px-4 border-t border-gray-200 border-solid">
                                    <nav className="flex items-center space-x-1 justify-end mb-3">
                                        <div className='flex'>
                                            <button type="button" disabled={currentPage === 1} onClick={handlePrevious}
                                                className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none">
                                                <span aria-hidden="true">«</span>
                                                <span className="sr-only">Previous</span>
                                            </button>
                                            {getPaginationButtons(totalPages, currentPage, handleCurrentPage)}
                                            <button type="button" disabled={currentPage === totalPages} onClick={handleNext}
                                                className='p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none'>
                                                <span className="sr-only">Next</span>
                                                <span aria-hidden="true">»</span>
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
