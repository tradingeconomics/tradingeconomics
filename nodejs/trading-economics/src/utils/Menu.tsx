import { IoMdSearch } from "react-icons/io";
import { BsBarChartLineFill } from "react-icons/bs";

const MenuList = [
    { sideLabel: 'Search', to: '/search', icon: <IoMdSearch size={'100%'} /> },
    { sideLabel: 'Indicators', to: '/credit-rating', icon: <BsBarChartLineFill size={'100%'} /> },
    { sideLabel: 'Historical Data', to: '/historical-data', icon: <BsBarChartLineFill size={'100%'} /> },
    { sideLabel: 'Historical Data', to: '/historical-data-indicator', icon: <BsBarChartLineFill size={'100%'} /> },
    { sideLabel: 'Indicators', to: '/w', icon: <BsBarChartLineFill size={'100%'} /> },
    { sideLabel: 'Indicators', to: '/q', icon: <BsBarChartLineFill size={'100%'} /> }
];

export default MenuList;
