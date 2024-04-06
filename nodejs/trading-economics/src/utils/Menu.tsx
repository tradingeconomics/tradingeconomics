import { FaCity } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { BsBarChartLineFill } from "react-icons/bs";


const MenuList = [
    { sideLabel: 'Credit Rating', to: '/credit-rating', icon: <FaChartLine size={'100%'} /> },
    { sideLabel: 'Data By Countries', to: '/historical-data-country', icon: <FaCity size={'100%'} /> },
    { sideLabel: 'Data By Indicators', to: '/historical-data-indicator', icon: <BsBarChartLineFill size={'100%'} /> },
];

export default MenuList;
