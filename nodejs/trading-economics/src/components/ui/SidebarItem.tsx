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
        <li className={`${props.className} ${isActive ? 'bg-secondary' : 'hover:border-secondary hover:bg-opacity-50'}`}
            onClick={() => header.setTitle(children)} title={children}>
            <Link className='flex gap-4' to={to}>
                <div className='w-7 h-7'> {icon} </div>
                <div className={`${!open && 'hidden'} origin-left duration-200`}>
                    {children}
                </div>
            </Link>
        </li >
    );
};

export default SidebarItem;
