import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Reports = () => {
  const totalSales = 49250;
  const totalOrders = 135;
  const lowStock = 8;

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales (DA)',
        data: [8500, 11200, 9500, 12000, 9800],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Electronics', 'Clothes', 'Supplements', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: ['#6366F1', '#F59E0B', '#10B981', '#EF4444'],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">📊 Reports Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-sm text-gray-500">Total Sales</h2>
          <p className="text-xl font-bold text-indigo-600">{totalSales} DA</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-sm text-gray-500">Orders This Month</h2>
          <p className="text-xl font-bold text-green-600">{totalOrders}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-sm text-gray-500">Low Stock Alerts</h2>
          <p className="text-xl font-bold text-red-600">{lowStock}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Over Months</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Product Category Distribution</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
