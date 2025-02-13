// src/components/Sales.tsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSale, updateSale, deleteSale, clearSales } from "../../store/appSlice";
import Button from "../../components/Button";
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import { ref, set, onValue, remove } from "firebase/database"; 
import { database } from '../../firebase'; 

interface Sale {
  id: string;
  productName: string;
  quantitySold: number;
  salesDate: string;
}

interface RootState {
  app: {
    salesItems: Sale[];
  };
}

const Sales = () => {
  const dispatch = useDispatch();
  const salesItems = useSelector((state: RootState) => state.app.salesItems);
  const [productName, setProductName] = useState<string>("");
  const [quantitySold, setQuantitySold] = useState<number>(0);
  const [salesDate, setSalesDate] = useState<string>("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null); 

  const getNextId = () => {
    const ids = salesItems.map(item => Number(item.id));
    return ids.length > 0 ? (Math.max(...ids) + 1).toString() : "1";
  };

  useEffect(() => {
    const dbRef = ref(database, 'salesItems/');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        dispatch(clearSales());
        const items = Object.keys(data).map(key => ({
          id: key, 
          ...data[key],
        }));
        items.forEach(item => dispatch(addSale(item)));
      }
    });
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSale: Sale = {
      id: editingItemId !== null ? editingItemId : getNextId(), 
      productName,
      quantitySold,
      salesDate,
    };

    // Check for duplicates based on product name and sales date
    const duplicateItem = salesItems.find(item => 
      item.productName === newSale.productName && item.salesDate === newSale.salesDate && item.id !== newSale.id
    );

    if (duplicateItem) {
      alert("A sale with the same product name and date already exists.");
      return; // Prevent adding a duplicate
    }

    // If editing an existing sale, update it in Firebase
    set(ref(database, 'salesItems/' + newSale.id), newSale)
      .then(() => {
        if (editingItemId !== null) {
          dispatch(updateSale(newSale)); // Update the sale in Redux
        } else {
          dispatch(addSale(newSale)); // Add new sale to Redux
        }
        // Clear form fields
        setProductName("");
        setQuantitySold(0);
        setSalesDate("");
        setEditingItemId(null);
      })
      .catch(error => {
        console.error("Error adding/updating sale in Firebase: ", error);
      });
  };

  const handleEdit = (item: Sale) => {
    setProductName(item.productName);
    setQuantitySold(item.quantitySold);
    setSalesDate(item.salesDate);
    setEditingItemId(item.id);
  };

  const handleDelete = (id: string) => {
    remove(ref(database, 'salesItems/' + id))
      .then(() => {
        dispatch(deleteSale(id));
      })
      .catch(error => {
        console.error("Error deleting sale from Firebase: ", error);
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-between">
        <div className="py-3">
          <h1 className="text-2xl font-bold">Sales Management</h1>
          <p className="text-sm">Manage Sales</p>
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
              placeholder="Quantity Sold"
              value={quantitySold}
              onChange={(e) => setQuantitySold(Number(e.target.value))}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input 
              type="date" 
              value={salesDate}
              onChange={(e) => setSalesDate(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <Button type="submit" variant="primary" className='my-4 text-white'>
              {editingItemId !== null ? "Update Sale" : "Add Sale"}
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
              <th className="border border-gray-300 p-2">Quantity Sold</th>
              <th className="border border-gray-300 p-2">Sales Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesItems.map(item => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.productName}</td>
                <td className="border border-gray-300 p-2">{item.quantitySold}</td>
                <td className="border border-gray-300 p-2">{item.salesDate}</td>
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

export default Sales;