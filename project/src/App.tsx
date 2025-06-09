import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import ProtectedRoute from './components/ui/ProtectedRoute'; // Using your ProtectedRoute instead of PrivateRoute
import IntroPage from './pages/IntroPage'; // Fixed import name
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/inventory/Products';
import Categories from './pages/inventory/Categories';
import Brands from './pages/inventory/Brands';
import Vendors from './pages/partners/Vendors';
import Sales from './pages/transactions/Sales';
import Purchases from './pages/transactions/Purchases';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import Barcode from './pages/tools/Barcode';
import ChatAssistant from './pages/tools/ChatAssistant';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white',
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#059669',
                },
              },
              error: {
                style: {
                  background: '#DC2626',
                },
              }
            }}
          />

          <Routes>
            {/* Intro Splash Page - First route */}
            <Route path="/" element={<IntroPage />} />

            {/* Public Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory/products" element={<Products />} />
                <Route path="/inventory/categories" element={<Categories />} />
                <Route path="/inventory/brands" element={<Brands />} />
                <Route path="/partners/vendors" element={<Vendors />} />
                <Route path="/transactions/sales" element={<Sales />} />
                <Route path="/transactions/purchases" element={<Purchases />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/tools/barcode" element={<Barcode />} />
                <Route path="/tools/chat-assistant" element={<ChatAssistant />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;