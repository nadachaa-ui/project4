import React from 'react';
import { PlusCircle, ShoppingCart, FileText } from 'lucide-react';

const dummyPurchases = [
  {
    id: 'PO-001',
    vendor: 'Tech Distributors Inc.',
    date: '2025-05-17',
    items: 8,
    total: '$1,200',
    status: 'Received',
  },
  {
    id: 'PO-002',
    vendor: 'Global Supplies',
    date: '2025-05-15',
    items: 3,
    total: '$420',
    status: 'Pending',
  },
];

function Purchases() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Purchase Transactions</h1>
        <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Purchase
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-5 flex items-center space-x-4">
          <ShoppingCart className="h-10 w-10 text-primary-500" />
          <div>
            <p className="text-sm text-gray-500">Total Purchases</p>
            <p className="text-xl font-bold">52</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex items-center space-x-4">
          <FileText className="h-10 w-10 text-primary-500" />
          <div>
            <p className="text-sm text-gray-500">Total Amount Spent</p>
            <p className="text-xl font-bold">$9,340</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Purchase ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Vendor</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Items</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Total</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyPurchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{purchase.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{purchase.vendor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{purchase.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{purchase.items}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{purchase.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold 
                    ${purchase.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {purchase.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Purchases;
