import React, { useState } from 'react';

function Settings() {
  const [storeName, setStoreName] = useState("Nadoushi's Empire");
  const [currency, setCurrency] = useState("DZD");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">⚙️ Settings</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>

        <div className="space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Currency Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="DZD">Dinar (DZD)</option>
              <option value="USD">Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm ${
                notificationsEnabled ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {notificationsEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={() => alert('Settings saved! 💾')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
