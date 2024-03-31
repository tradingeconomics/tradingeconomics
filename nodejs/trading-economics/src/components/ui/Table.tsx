import { TableConfig } from '../../utils/Types';

type Props = {
    header: string[],
    config?: TableConfig,
    data: {
        [x: string]: any;
    }[];
};

const defaultConfig: TableConfig = {
    rounded: false,
    borderless: true
};

export default function Table({ data, header, config }: Props) {
    const { rounded, borderless } = config ?? defaultConfig;

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className={`${borderless && 'border'} ${rounded && 'rounded-lg'} border-slate-500 overflow-hidden`}>
                            <table className="min-w-full divide-y divide-slate-500">
                                <thead className='bg-gray'>
                                    <tr>
                                        {header.map((title, index) => (
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-light"
                                                scope="col" key={index}>
                                                {title}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-300">
                                    {data.map((el, index) => (
                                        <tr key={index} className='hover:bg-gray'>
                                            {header.map((key, index) => (
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-primary-light"
                                                    key={index}>
                                                    {el[key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
