import { useHeaderContext } from '../hooks/HeaderContext';

const Header = () => {
    const header = useHeaderContext();

    return (
        <header className='flex items-center h-16 bg-gray p-5 text-2xl font-medium'>
            {header.title}
        </header>
    );
};

export default Header;
