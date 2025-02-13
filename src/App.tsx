import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import AdminLogin from './pages/Adminlogin'; 
import Admin from './pages/admin/AdminDash'; 
import User from './pages/user/UserDash';
import { AuthProvider } from './context/Authcontext'; 
import ProtectedRoute from './components/ProtectedRoutes'; // Protect routes

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='products' element={<Products />} />
        <Route path='contact' element={<Contact />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='admin' element={<AdminLogin />} />
        <Route path='admin/*' element={<Admin />} />
        <Route path='user/*' element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;