import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;