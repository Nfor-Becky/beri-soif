// src/pages/admin/AdminDash.tsx
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import Sidebar from "../../components/Sidebar"; 
import Inventory from "./Inventory";
import Sales from "./Sales"; 
import Order from "./Order"; 
import Reports from "./Reports"; 
import Clients from './Clients';
import Dashboard from './Dashboard';

// Define the types
interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  date: string;
}

interface Sale {
  id: string;
  productName: string;
  quantitySold: number;
  salesDate: string;
}

interface RootState {
  app: {
    inventoryItems: InventoryItem[];
    salesItems: Sale[];
  };
}

const AdminDash: React.FC = () => {
  const inventoryItems = useSelector((state: RootState) => state.app.inventoryItems);
  const salesItems = useSelector((state: RootState) => state.app.salesItems);

  return (
    <div className='md:flex md:gap-3'>
      <Sidebar />
      <div className="md:flex-1 md:gap-1 m-4 md:rounded md:w-full justify-between p-2">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/reports" element={<Reports inventoryItems={inventoryItems} salesItems={salesItems} />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDash;