import React, { useEffect, useState } from 'react';
import { database } from '../../firebase'; // Ensure this imports the Realtime Database
import { ref, onValue, remove } from 'firebase/database'; // Import necessary functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const ordersRef = ref(database, 'orders');
    onValue(ordersRef, (snapshot) => {
      const orderList: any[] = [];
      snapshot.forEach((childSnapshot) => {
        const order = { id: childSnapshot.key, ...childSnapshot.val() };
        orderList.push(order);
      });
      setOrders(orderList);
    });

    return () => {
      setOrders([]); // Cleanup
    };
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await remove(ref(database, 'orders/' + id));
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting order: ", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const handleEdit = (orderId: string) => {
    // Redirect to OrderForm with orderId for editing
    navigate(`/user/orderform/${orderId}`);
  };

  return (
    <div>
      <table className="mt-4 border-collapse border border-gray-200 w-full rounded-xl">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.productName}</td>
              <td className="border border-gray-300 p-2">{order.quantity}</td>
              <td className="border border-gray-300 p-2">{order.date}</td>
              <td className="border border-gray-300 p-2">
                <div className="flex space-x-2">
                  <img 
                    src={editIcon} 
                    alt="Edit" 
                    className="inline-block cursor-pointer h-6 w-6"
                    onClick={() => handleEdit(order.id)} // Call handleEdit with order ID
                  />
                  <img 
                    src={deleteIcon} 
                    alt="Delete" 
                    className="inline-block cursor-pointer h-6 w-6"
                    onClick={() => handleDelete(order.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;