import { Link } from 'react-router-dom';

type Props = {
    to: string,
    children: string,
    [x: string]: any;
};

const CustomLink = ({ to, children, ...props }: Props) => {
    return (
        <li>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
};

export default CustomLink;
