import React from 'react';
import { PlusCircle, DollarSign, ReceiptText, Calendar } from 'lucide-react';

const dummySales = [
  {
    id: 'SO-101',
    customer: 'John Doe',
    date: '2025-05-17',
    items: 5,
    total: '$650',
    status: 'Completed',
  },
  {
    id: 'SO-102',
    customer: 'Emily Carter',
    date: '2025-05-16',
    items: 2,
    total: '$180',
    status: 'Pending',
  },
];

const Sales = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Sales Transactions</h1>
        <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Sale
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <ReceiptText className="h-10 w-10 text-primary-500" />
          <div>
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-xl font-bold">134</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <DollarSign className="h-10 w-10 text-primary-500" />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-bold">$18,720</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <Calendar className="h-10 w-10 text-primary-500" />
          <div>
            <p className="text-sm text-gray-500">Today’s Sales</p>
            <p className="text-xl font-bold">$1,050</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Sale ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Items</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Total</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummySales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 text-sm text-gray-800">{sale.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{sale.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{sale.date}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{sale.items}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{sale.total}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold 
                    ${sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
