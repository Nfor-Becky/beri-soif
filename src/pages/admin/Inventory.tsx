import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInventoryItem, updateInventoryItem, deleteInventoryItem, clearInventoryItems } from "../../store/appSlice";
import Button from "../../components/Button";
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import { ref, set, onValue, remove } from "firebase/database"; 
import { database } from '../../firebase'; 

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  date: string;
}

interface RootState {
  app: {
    inventoryItems: InventoryItem[];
  };
}

const Inventory = () => {
  const dispatch = useDispatch();
  const inventoryItems = useSelector((state: RootState) => state.app.inventoryItems);
  const [productName, setProductName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null); 

  const getNextId = () => {
    const ids = inventoryItems.map(item => Number(item.id));
    return ids.length > 0 ? (Math.max(...ids) + 1).toString() : "1";
  };

  useEffect(() => {
    const dbRef = ref(database, 'inventoryItems/');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        dispatch(clearInventoryItems());
        const items = Object.keys(data).map(key => ({
          id: key, 
          ...data[key],
        }));
        items.forEach(item => dispatch(addInventoryItem(item)));
      }
    });
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: InventoryItem = {
      id: editingItemId !== null ? editingItemId : getNextId(), 
      name: productName,
      quantity,
      date,
    };

    // Check for duplicates based on name and date
    const duplicateItem = inventoryItems.find(item => 
      item.name === newItem.name && item.date === newItem.date && item.id !== newItem.id
    );

    if (duplicateItem) {
      alert("An item with the same name and date already exists.");
      return; // Prevent adding a duplicate
    }

    // If editing an existing item, update it in Firebase
    set(ref(database, 'inventoryItems/' + newItem.id), newItem)
      .then(() => {
        if (editingItemId !== null) {
          dispatch(updateInventoryItem(newItem)); // Update the item in Redux
        } else {
          dispatch(addInventoryItem(newItem)); // Add new item to Redux
        }
        // Clear form fields
        setProductName("");
        setQuantity(0);
        setDate("");
        setEditingItemId(null);
      })
      .catch(error => {
        console.error("Error adding/updating item in Firebase: ", error);
      });
  };

  const handleEdit = (item: InventoryItem) => {
    setProductName(item.name);
    setQuantity(item.quantity);
    setDate(item.date);
    setEditingItemId(item.id);
  };

  const handleDelete = (id: string) => {
    remove(ref(database, 'inventoryItems/' + id))
      .then(() => {
        dispatch(deleteInventoryItem(id));
      })
      .catch(error => {
        console.error("Error deleting item from Firebase: ", error);
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-between">
        <div className="py-3">
          <h1 className="text-2xl font-bold">Stock Management</h1>
          <p className="text-sm">Manage Products</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-lg">
            <select 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Product Name</option>
              <option value="Sachet">Sachet</option>
              <option value="Bottle">Bottle</option>
            </select>

            <input 
              type="number" 
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
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
              {editingItemId !== null ? "Update Product" : "Add Product"}
            </Button>
          </form>
        </div>
      </div>
      
      {/* Scrollable Table Container */}
      <div className="overflow-auto md:max-h-80 sm:max-h-60">
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
            {inventoryItems.map(item => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">{item.date}</td>
                <td className="border border-gray-300 p-4 flex justify-around">
                  <div className="md:p-3 md:hover:bg-green-600 rounded">
                    <img 
                      src={editIcon} 
                      alt="Edit" 
                      className="inline-block cursor-pointer md:h-6 md:w-6 sm:h-3 sm:w-3"
                      onClick={() => handleEdit(item)}
                    />
                  </div>
                  <div className="md:p-3 md:hover:bg-red-600 rounded">
                    <img 
                      src={deleteIcon} 
                      alt="Delete" 
                      className="inline-block cursor-pointer md:h-6 md:w-6 sm:h-3 sm:w-3"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;