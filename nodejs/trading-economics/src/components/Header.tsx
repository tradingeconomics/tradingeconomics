import { useHeaderContext } from '../hooks/HeaderContext';

const Header = () => {
    const header = useHeaderContext();

    return (
        <header className='flex items-center h-16 bg-primary-light py-5 px-7 text-2xl font-medium text-white'>
            {header.title}
        </header>
    );
};

export default Header;
