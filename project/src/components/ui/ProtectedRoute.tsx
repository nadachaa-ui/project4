import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Added Outlet
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';


interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => { // Removed children
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-secondary-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <Outlet />; // Render child routes
};

export default ProtectedRoute;