import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../App';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(AppContext);

  if (isLoading) {
    return <Loader style={{ height: '100vh' }} />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
