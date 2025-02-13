
import React from 'react';
import {Link} from 'react-router-dom'

interface NavLinkProps {
    children: React.ReactNode;
    href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => {
    return (
        <Link 
            to={href} 
            className="relative group inline-block no-underline"
        >
            {children}
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
        </Link>
    );
};

export default NavLink;