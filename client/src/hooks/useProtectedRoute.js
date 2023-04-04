import { useNavigate } from 'react-router-dom';
import  useAuth  from './useAuth';

export const useProtectedRoute = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    navigate('/login');
  }
};