import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  // Redirect to login if user is not authenticated
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;