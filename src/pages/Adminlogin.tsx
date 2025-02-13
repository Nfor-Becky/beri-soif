import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple authentication logic
    if (username === "admin" && password === "123") {
      navigate('/admin/dashboard'); // Redirect to the admin dashboard
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className="container w-96 bg-white p-6 rounded shadow-md">
        <h1 className='text-2xl font-semibold'>Admin Login</h1>
        <form className="mt-4" onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder='Username' 
            className='w-full p-2 border border-gray-400 rounded mb-4' 
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder='Password' 
            className='w-full p-2 border border-gray-400 rounded mb-4' 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button className='w-full bg-blue-500 text-white p-2 rounded' type='submit'>Login</button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;