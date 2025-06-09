import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Clipboard,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Package,
  CreditCard,
  DollarSign,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

// Simulated backend API calls
const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalSales: 12450.75,
        todaySales: 1875.25,
        todayPurchases: 920.50,
        stockValue: 57830.90,
        stockCount: 324,
        inventoryStatus: {
          inStock: 78,
          lowStock: 12,
          outOfStock: 10
        },
        weeklySales: [3200, 4100, 2800, 3900, 4500, 5200, 6300],
        topCategories: [
          { name: 'Electronics', value: 12400 },
          { name: 'Clothing', value: 8900 },
          { name: 'Home & Kitchen', value: 6700 },
          { name: 'Beauty', value: 5300 },
          { name: 'Sports', value: 4100 }
        ],
        recentTransactions: [
          { id: 1, customer: 'Belmahdi Nada', amount: 245.75, status: 'Completed', type: 'Sale' },
          { id: 2, customer: 'arwa .', amount: 1200.00, status: 'Pending', type: 'Purchase' },
          { id: 3, customer: 'nada ', amount: 89.99, status: 'Completed', type: 'Sale' },
          { id: 4, customer: 'zahra', amount: 560.25, status: 'Completed', type: 'Purchase' },
          { id: 5, customer: 'maria', amount: 325.50, status: 'Completed', type: 'Sale' }
        ],
        lowStockItems: [
          { id: 101, name: 'Wireless Earbuds', current: 8, min: 10 },
          { id: 102, name: 'Gaming Mouse', current: 5, min: 15 },
          { id: 103, name: 'Bluetooth Speaker', current: 3, min: 10 },
          { id: 104, name: 'USB-C Charger', current: 12, min: 20 }
        ]
      });
    }, 800);
  });
};

type DashboardData = {
  totalSales: number;
  todaySales: number;
  todayPurchases: number;
  stockValue: number;
  stockCount: number;
  inventoryStatus: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
  weeklySales: number[];
  topCategories: { name: string; value: number }[];
  recentTransactions: {
    id: number;
    customer: string;
    amount: number;
    status: string;
    type: string;
  }[];
  lowStockItems: {
    id: number;
    name: string;
    current: number;
    min: number;
  }[];
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data as DashboardData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Data Load Failed</h3>
          <p className="text-gray-600 mb-6">We couldn't load your dashboard data. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Chart data based on backend information
  const inventoryChartData = {
    labels: ["In Stock", "Low Stock", "Out of Stock"],
    datasets: [
      {
        data: [
          dashboardData.inventoryStatus.inStock,
          dashboardData.inventoryStatus.lowStock,
          dashboardData.inventoryStatus.outOfStock
        ],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderWidth: 0,
        hoverOffset: 15
      },
    ],
  };

  const salesChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Sales ($)",
        data: dashboardData.weeklySales,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointRadius: 4
      },
    ],
  };

  const categoryChartData = {
    labels: dashboardData.topCategories.map(cat => cat.name),
    datasets: [
      {
        label: 'Sales by Category ($)',
        data: dashboardData.topCategories.map(cat => cat.value),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `$${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(241, 245, 249, 0.5)'
        },
        ticks: {
          callback: function(tickValue: string | number) {
            return '$' + tickValue;
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    maintainAspectRatio: false
  };

  const doughnutOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: { label: any; parsed: any; }) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: { parsed: { y: { toLocaleString: () => any; }; }; }) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(241, 245, 249, 0.5)'
        },
        ticks: {
          callback: function(value: { toLocaleString: () => string; }) {
            return '$' + value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    maintainAspectRatio: false
  };

  // Format currency
  const formatCurrency = (value: number | bigint) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center bg-white py-2 px-4 rounded-lg shadow-sm border border-gray-200">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-gray-700 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Total Sales */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-400/20 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-blue-100">Total Sales</h3>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatCurrency(dashboardData.totalSales)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-100 text-sm">Monthly target</span>
                <span className="text-white font-medium">85%</span>
              </div>
              <div className="mt-1 w-full bg-blue-400/30 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Value */}
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-teal-400/20 p-3 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-teal-100">Stock Value</h3>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatCurrency(dashboardData.stockValue)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-teal-100 text-sm">Total products</span>
                <span className="text-white font-medium">{dashboardData.stockCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Sales */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-400/20 p-3 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-amber-100">Today's Sales</h3>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatCurrency(dashboardData.todaySales)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-white mr-1" />
                <span className="text-white text-sm">+12.5% from yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Purchases */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-violet-400/20 p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-violet-100">Today's Purchases</h3>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatCurrency(dashboardData.todayPurchases)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <TrendingDown className="h-5 w-5 text-white mr-1" />
                <span className="text-white text-sm">-5.2% from yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Sales Performance</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Last 7 days</span>
              <BarChart3 className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="h-80">
            <Line data={salesChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Inventory Chart */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Inventory Status</h2>
            <Clipboard className="h-5 w-5 text-blue-500" />
          </div>
          <div className="h-80">
            <Doughnut data={inventoryChartData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Additional Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Categories */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Top Selling Categories</h2>
            <div className="text-sm text-blue-600 font-medium">
              <Link to="/analytics" className="flex items-center">
                View details <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="h-80">
            <Bar data={categoryChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <CreditCard className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {dashboardData.recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">{transaction.customer}</h3>
                  <p className="text-sm text-gray-500">{transaction.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{formatCurrency(transaction.amount)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/transactions" className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
              View all transactions <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Low Stock Items */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Low Stock Items</h2>
          <div className="text-sm text-blue-600 font-medium">
            <Link to="/inventory" className="flex items-center">
              Manage inventory <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Minimum Required
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.lowStockItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.current}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.min}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Needs Restocking
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white">Need to take action?</h3>
            <p className="text-blue-100 mt-1">Quickly access important features</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link 
              to="/sales" 
              className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg text-center transition duration-200"
            >
              <div className="flex flex-col items-center">
                <ShoppingBag className="h-6 w-6 mb-1" />
                <span className="text-sm">New Sale</span>
              </div>
            </Link>
            <Link 
              to="/purchases" 
              className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg text-center transition duration-200"
            >
              <div className="flex flex-col items-center">
                <ShoppingCart className="h-6 w-6 mb-1" />
                <span className="text-sm">New Purchase</span>
              </div>
            </Link>
            <Link 
              to="/inventory" 
              className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg text-center transition duration-200"
            >
              <div className="flex flex-col items-center">
                <Package className="h-6 w-6 mb-1" />
                <span className="text-sm">Manage Stock</span>
              </div>
            </Link>
            <Link 
              to="/reports" 
              className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg text-center transition duration-200"
            >
              <div className="flex flex-col items-center">
                <BarChart3 className="h-6 w-6 mb-1" />
                <span className="text-sm">View Reports</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;