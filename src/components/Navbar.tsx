import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Button from './Button';
import Navlinks from './Navlinks';
import menuIcon from '../assets/menu.png'; 
import crossIcon from '../assets/cross.png';


const Navbar: React.FC = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex text-white justify-between bg-navColor px-7 py-4 relative">
      <div className="logo text-[20px] uppercase font-bold">Beri Soif</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between text-[16px]">
        <ul className="flex justify-between px-7 py-2">
          <li className="text-white px-3"><Navlinks href="/">Home</Navlinks></li>
          <li className="text-white px-3"><Navlinks href="/about">About Us</Navlinks></li>
          <li className="text-white px-3"><Navlinks href="/products">Products</Navlinks></li>
        </ul>
      <Link to='/signup'><Button variant='primary'>Sign Up</Button></Link>  
      </div>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="md:hidden cursor-pointer">
        {nav ? (
          <img src={crossIcon} alt="Close menu" className="h-6 w-6" />
        ) : (
          <img src={menuIcon} alt="Open menu" className="h-6 w-6" />
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`fixed md:hidden left-0 top-0 w-[60%] h-full px-5 bg-navColor ease-in-out duration-500 z-50 ${nav ? 'translate-x-0' : '-translate-x-full'}`}
        role="navigation" // Accessibility role
        aria-hidden={!nav} // Accessibility attribute
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold my-4'>Beri Soif</h1>
        <li className="text-white py-3 px-3 hover:bg-white hover:text-navColor rounded font-semibold">
          <Navlinks href="/">Home</Navlinks>
        </li>
        <li className="text-white py-3 px-3 hover:bg-white hover:text-navColor rounded font-semibold">
          <Navlinks href="/about">About Us</Navlinks>
        </li>
        <li className="text-white py-3 px-3 hover:bg-white hover:text-navColor rounded font-semibold">
          <Navlinks href="/products">Products</Navlinks>
        </li>
        <Link to='/signup'><Button className='my-4'>Sign Up</Button></Link>
      </ul>
    </div>
  );
};

export default Navbar;