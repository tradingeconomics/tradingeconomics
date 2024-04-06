import { ReactNode } from 'react';
import { useHeaderContext } from '../../hooks/HeaderContext';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

type Props = {
    to: string,
    open: boolean,
    icon: ReactNode,
    children: string,
    [x: string]: any;
};

const SidebarItem = ({ to, children, icon, open, ...props }: Props) => {
    const header = useHeaderContext();
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <Link className={`${props.className} ${isActive ? 'bg-secondary' : 'hover:border-secondary hover:bg-opacity-50'}`} to={to}>
            <li className='flex gap-4'
                onClick={() => header.setTitle(children)} title={children}>
                <div className='w-7 h-7'> {icon} </div>
                <div className={`${!open && 'hidden'} origin-left duration-300`}>
                    {children}
                </div>
            </li >
        </Link>
    );
};

export default SidebarItem;
