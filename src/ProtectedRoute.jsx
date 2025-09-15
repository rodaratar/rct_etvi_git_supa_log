// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}