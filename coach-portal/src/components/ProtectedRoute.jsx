import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check user status and redirect accordingly
    if (user?.status === 'pending') {
        // Only redirect to pending-approval if we're not already there
        if (location.pathname !== '/pending-approval') {
            return <Navigate to="/pending-approval" replace />;
        }
    } else if (location.pathname === '/pending-approval') {
        // If user is not pending but tries to access pending-approval page
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute; 