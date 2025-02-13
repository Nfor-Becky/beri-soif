import React, { useState, useEffect } from 'react';
import { database } from '../../firebase'; // Ensure this imports the Realtime Database
import { ref, set, onValue } from 'firebase/database'; // Import necessary functions
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import Button from "../../components/Button";

const OrderForm: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [quantity, setQuantity] = useState<number | string>("1");
  const [date, setDate] = useState<string>("");
  const [lastId, setLastId] = useState<number>(0);
  const navigate = useNavigate(); // Initialize navigate for redirection
  const { orderId } = useParams<{ orderId?: string }>(); // Get orderId from URL parameters

  // Fetch the last used ID and order details if editing
  useEffect(() => {
    const ordersRef = ref(database, 'orders');
    
    // Get the last order ID
    onValue(ordersRef, (snapshot) => {
      let maxId = 0;
      snapshot.forEach((childSnapshot) => {
        const currentId = parseInt(childSnapshot.key || "0");
        if (currentId > maxId) {
          maxId = currentId;
        }
      });
      setLastId(maxId);
    });

    // If editing an order, fetch its details
    if (orderId) {
      const orderRef = ref(database, 'orders/' + orderId);
      onValue(orderRef, (snapshot) => {
        const orderData = snapshot.val();
        if (orderData) {
          setProductName(orderData.productName);
          setQuantity(orderData.quantity);
          setDate(orderData.date);
        }
      });
    }
  }, [orderId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const orderIdToUse = orderId ? parseInt(orderId) : lastId + 1; // Use existing ID or increment
    const order = {
      productName,
      quantity: Number(quantity),
      date,
    };

    try {
      await set(ref(database, 'orders/' + orderIdToUse), order);
      // Redirect to Orders page after successful submission
      navigate('/user/orders'); // Redirect to the correct route
    } catch (error) {
      console.error("Error placing/updating order: ", error);
      alert("Failed to place/update order. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-between h-[60vh] w-[80%] m-auto bg-blue-50 p-6 shadow-md rounded-lg">
        <select 
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Product</option>
          <option value="Sachet">Sachet</option>
          <option value="Bottle">Bottle</option>
          <option value="Cup">Cup</option>
        </select>

        <input 
          type="number" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <Button type="submit" variant="primary" className='my-4 text-white'>
          {orderId ? 'Update Order' : 'Order'}
        </Button>
      </form>
    </div>
  );
}

export default OrderForm;