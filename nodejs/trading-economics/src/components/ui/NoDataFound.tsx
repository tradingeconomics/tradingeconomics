import { RxCross1 } from 'react-icons/rx';

type Props = {
    header: string[];
};

const NoDataFound = ({ header }: Props) => {
    return (
        <div className='flex grow flex-col sm:px-6 lg:px-8'>
            <div className='flex w-full justify-between'>
                {header.map((title, index) => (
                    <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-light sm:min-w-24 lg:min-w-44"
                        key={index}>
                        {title}
                    </div>
                ))}
            </div>
            <div className='flex grow items-center justify-center bg-white'>
                <div className='flex gap-5 flex-col items-center'>
                    <RxCross1 className='w-8 h-8' />
                    <p className='text-base font-medium'>No Data Found</p>
                </div>
            </div>
        </div>
    );
};

export default NoDataFound;
