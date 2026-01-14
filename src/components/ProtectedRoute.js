import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userInfo } = useContext(AuthContext);

  // Not logged in
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  // Admin-only route
  if (adminOnly && userInfo.user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
