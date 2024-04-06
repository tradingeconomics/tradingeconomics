import { useState } from 'react';
import MenuList from '../utils/Menu';
import SidebarItem from './ui/SidebarItem';
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={`duration-300 z-10 ${open ? 'w-64' : 'w-20'}`}>
            <nav className={`h-screen fixed flex flex-col bg-primary duration-300 ${open ? 'w-64' : 'w-20'}`} >
                <div className='absolute cursor-pointer -right-3 top-16 bg-primary rounded-full'>
                    <IoIosArrowDropleftCircle className={`text-gray-pure w-7 h-7 ${!open && 'rotate-180'}`}
                        onClick={() => setOpen(!open)} />
                </div>
                <div className='flex justify-center items-center h-16'>
                    <h1 className={`text-white font-medium text-xl ${open ? 'flex gap-x-1' : 'gap-y-0 w-8 font-bold'}`}>
                        <p className={`flex items-center justify-center ${!open && 'text-gray-pure bg-primary-light'}`}>
                            <span>T</span>
                            {open && <span>rading</span>}
                        </p>
                        <p className={`flex items-center justify-center ${!open && 'text-primary bg-gray-pure'}`}>
                            <span>E</span>
                            {open && <span>conomics</span>}
                        </p>
                    </h1>
                </div>
                <hr className='border-primary-light' />
                <ul className='flex flex-col gap-y-2 px-4 py-2'>
                    {MenuList.map((menu, index) => (
                        <SidebarItem className='flex items-center gap-x-4 text-base cursor-pointer text-gray-pure p-2 rounded-md hover:bg-secondary'
                            key={index} to={menu.to} icon={menu.icon} open={open}>
                            {menu.sideLabel}
                        </SidebarItem>
                    ))}
                </ul>
            </nav >
        </div>
    );
};

export default Navbar;
