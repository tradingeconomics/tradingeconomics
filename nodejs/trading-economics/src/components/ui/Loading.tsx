import { ImSpinner10 } from "react-icons/im";

const Loading = () => {
    return (
        <div className='flex grow flex-col items-center justify-center bg-opacity-80 bg-gray-300 relative w-full h-full mb-4'>
            <ImSpinner10 className='w-8 h-8 animate-spin' />
        </div>
    );
};

export default Loading;
