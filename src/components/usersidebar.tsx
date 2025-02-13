import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../assets/menu.png'; 
import crossIcon from '../assets/cross.png';

const Sidebar: React.FC = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex justify-between items-center p-4 md:hidden bg-navColor">
        <h2 className="text-customColor text-2xl font-bold">Beri Soif</h2>
        <div onClick={handleNav} className="cursor-pointer">
          {nav ? (
            <img src={crossIcon} alt="Close menu" className="h-6 w-6" />
          ) : (
            <img src={menuIcon} alt="Open menu" className="h-6 w-6" />
          )}
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col bg-navColor p-4 w-64 min-h-screen">
        <h2 className="text-customColor text-2xl font-bold mb-6">Welcome to Beri Soif</h2>
        <div className="flex flex-col text-lg font-bold text-white">
          <Link to="/user" className='hover:w-full block hover:bg-customColor hover:rounded-xl hover:p-3 mb-4'>Place More Orders</Link>
          <Link to='/user/orders' className='hover:w-full block hover:bg-customColor hover:rounded-xl hover:p-3 mb-4'>Orders</Link>
          <Link to='/user' className='w-full block hover:bg-red-700 hover:rounded-xl hover:p-2 mb-4'>LOGOUT</Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed left-0 top-0 w-[60%] h-full px-5 bg-navColor ease-in-out duration-500 z-50 md:hidden ${nav ? 'translate-x-0' : '-translate-x-full'}`}
        role="navigation" 
        aria-hidden={!nav} 
      >
        <h2 className="text-customColor text-2xl font-bold mb-6">Beri Soif</h2>
        <div className="flex flex-col text-lg font-bold text-white">
          <Link to="/user" className='hover:w-full block hover:bg-customColor hover:rounded-xl hover:p-3 mb-4'>Place More Orders</Link>
          <Link to='/user/orders' className='hover:w-full block hover:bg-customColor hover:rounded-xl hover:p-3 mb-4'>Orders</Link>
          <Link to='/user' className='w-full block hover:bg-red-700 hover:rounded-xl hover:p-2 mb-4'>LOGOUT</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;