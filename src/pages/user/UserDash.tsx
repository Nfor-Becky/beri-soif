import { Route, Routes } from 'react-router-dom';
import Sidebar from "../../components/usersidebar";
import ShoppingCart from "./Shoppingcart";
import Orderform from './Orderform';
import Orders from './Orders';

const UserDash = () => {
  return (
    <div className="md:flex md:gap-3">
      <Sidebar />
      <div className="md:flex-1 m-4 md:rounded md:w-full p-2">
        <Routes>
          <Route path="/" element={<ShoppingCart />} />
          <Route path="orderform/:orderId?" element={<Orderform />} /> {/* Optional orderId for editing */}
          <Route path="orders" element={<Orders />} /> {/* Ensure this matches */}
        </Routes>
      </div>
    </div>
  );
}

export default UserDash;