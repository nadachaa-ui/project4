import React, { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { BarChart3, Package, Users, ShoppingCart, TruckIcon, ClipboardList, Settings, ScanBarcode as BarcodeScan, Bot, Menu, X, Search, Bell, User as UserIcon, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { 
      name: 'Inventory', 
      icon: Package,
      children: [
        { name: 'Products', href: '/inventory/products' },
        { name: 'Categories', href: '/inventory/categories' },
        { name: 'Brands', href: '/inventory/brands' },
      ] 
    },
    { 
      name: 'Partners', 
      icon: Users,
      children: [
        { name: 'Vendors', href: '/partners/vendors' },
      ] 
    },
    { 
      name: 'Transactions', 
      icon: ShoppingCart,
      children: [
        { name: 'Sales', href: '/transactions/sales' },
        { name: 'Purchases', href: '/transactions/purchases' },
      ] 
    },
    { name: 'Reports', href: '/reports', icon: ClipboardList },
    { name: 'Barcode Generator', href: '/tools/barcode', icon: BarcodeScan },
    { name: 'Chat Assistant', href: '/tools/chat-assistant', icon: Bot },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpanded = (name: string) => {
    setExpanded(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-800/75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Bikou</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-5 px-2 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigation.map((item) => 
            !item.children ? (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon 
                  className={`mr-3 h-5 w-5 ${
                    isActive(item.href) ? 'text-primary-500 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                  }`} 
                />
                {item.name}
              </Link>
            ) : (
              <div key={item.name}>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    {item.name}
                  </div>
                  <svg
                    className={`h-5 w-5 transform transition-transform duration-200 ${
                      expanded[item.name] ? 'rotate-90' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
                
                {expanded[item.name] && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive(subItem.href)
                            ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-100'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex-1 max-w-xl mx-4 lg:mx-6">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </button>

              <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white dark:ring-gray-800"></span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    {user?.fullName.charAt(0) || 'U'}
                  </div>
                  <span className="hidden md:block font-medium">{user?.fullName || 'User'}</span>
                </button>
                
                {userMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.fullName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.username}</p>
                    </div>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;