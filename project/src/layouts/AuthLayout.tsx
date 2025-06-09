import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center">
            <Package className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Bikou
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Stock Management System for Small Businesses
          </p>
          
          <div className="mt-8">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="flex flex-col justify-center h-full px-12 text-white relative z-10">
            <h1 className="text-4xl font-bold mb-6">Manage your inventory with ease</h1>
            <p className="text-xl">
              Track stock levels, sales, and purchases in real-time. Get alerts when inventory runs low.
              Generate reports for better decision making.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">Real-time</div>
                <p>Stock monitoring and automatic alerts</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">Reports</div>
                <p>Detailed insights and analytics</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">Barcode</div>
                <p>Generate and scan product barcodes</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">AI Chat</div>
                <p>Ask questions and get instant help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;