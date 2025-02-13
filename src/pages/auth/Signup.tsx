import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Homefeature from '../../assets/homebg.jpg';
import { useState } from 'react';
import { auth } from '../../firebase'; 

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>(""); 
  const [error, setError] = useState<string>(""); 
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential);
      // Redirect the user to the user dashboard or home page
      navigate('/user'); // Adjust this path as needed
    } catch (error) {
      console.error("Error signing up:", error);
      setError((error as Error).message); // Set error message
    }
  };

  return (
    <div 
      className='flex items-center justify-center w-full h-screen'
      style={{ backgroundImage: `url(${Homefeature})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container relative flex flex-col items-center justify-center sm:w-[400px] md:w-[580px] rounded sm:h-[400px] md:h-[600px] bg-white py-10 px-14 shadow-lg z-10">
        <h1 className='my-5 uppercase text-3xl font-semibold'>Sign Up</h1>
        <form className="fields flex flex-col mb-3 mt-7 gap-7 w-full" onSubmit={handleSignup}>
          <input 
            type="text" 
            placeholder='Your Name' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='h-[72px] w-full pl-5 border border-gray-500 rounded outline-none text-gray-800 text-lg' 
          />
          <input 
            type="email" 
            placeholder='Email Address'  
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='h-[72px] w-full pl-5 border border-gray-500 rounded outline-none text-gray-800 text-lg' 
          />
          <input 
            type="password" 
            placeholder='Password'  
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='h-[72px] w-full pl-5 border border-gray-500 rounded outline-none text-gray-800 text-lg' 
          />
          <button 
            type="submit" 
            className='text-white hover:bg-navColor rounded-full px-4 py-2 cursor-pointer bg-customColor w-full'
          >
            Continue
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <p className="mt-1 text-sm text-gray-400">
          Already have an account? 
          <span className='text-customColor font-bold'>
            <Link to='/login'> Login</Link>
          </span>
        </p>
        <div className="flex items-center mt-5 gap-3">
          <input type="checkbox" name='' id='' />
          <p className='text-lg text-gray-500'>By continuing, I agree to the terms and conditions</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;