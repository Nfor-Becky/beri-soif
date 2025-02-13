import Button from "../../components/Button"
import { Link } from "react-router-dom"

const Order = () => {
  return (
    <div>
      <div className="">
      <div className="flex flex-col justify-between">
        <div className="py-3">
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-sm">Manage Products</p>
        </div>
        <div>
          <form className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-lg">
            <select className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Product Name</option>
              <option value="Sachet">Sachet</option>
              <option value="Bottle">Bottle</option>
            </select>
            
            <input 
              type="number" 
              placeholder="Quantity Sold"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input 
              type="date" 
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <Button type="submit" variant="primary" className='my-4 text-white'>Add Product</Button>
          </form>
        </div>
      </div>
     <table className="mt-4 border-collapse border border-gray-200 w-full rounded-xl">
        <thead>
        <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Client Name</th>
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
          <tr></tr>
            </thead>    
    </table> 
    </div>
    </div>
  )
}

export default Order
