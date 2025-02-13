import { Link, useNavigate } from 'react-router-dom';
import Homefeature from '../../assets/homebg.jpg';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential);
      // Redirect to user dashboard after successful login
      navigate('/user'); // Adjust the path if necessary
    } catch (error) {
      console.error("Error logging in:", error);
      setError((error as Error).message); // Display error message
    }
  };

  return (
    <div 
      className='flex items-center justify-center w-full h-screen'
      style={{ backgroundImage: `url(${Homefeature})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container items-center justify-center sm:w-[400px] md:w-[580px] rounded sm:h-[400px] md:h-[600px] bg-white m-auto py-10 px-14">
        <h1 className='my-5 uppercase text-3xl font-semibold'>Login</h1>
        <form className="fields flex flex-col mb-3 mt-7 gap-7" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder='Email Address' 
            className='h-[72px] w-full pl-5 border-solid border border-gray-500 rounded outline-none text-gray-800 text-lg' 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder='Password'  
            className='h-[72px] w-full pl-5 border-solid border border-gray-500 rounded outline-none text-gray-800 text-lg'
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button className='text-white hover:bg-navColor rounded-full px-4 py-2 cursor-pointer bg-customColor w-full' type='submit'>LOGIN</button>
        </form>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <p className="mt-1 text-sm text-gray-400">
          Don't have an account? 
          <span className='text-customColor font-bold'>
            <Link to='/signup'> Signup</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;