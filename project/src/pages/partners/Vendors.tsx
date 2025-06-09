import React, { useState, useEffect } from 'react';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorContact, setNewVendorContact] = useState('');

  useEffect(() => {
    // Simulate fetching vendors from some badass API or DB
    setTimeout(() => {
      setVendors([
        { id: 1, name: 'FastSupply Co.', contact: 'fast@supply.com' },
        { id: 2, name: 'Boxer Gear Inc.', contact: 'contact@boxergear.com' },
        { id: 3, name: 'Protein Masters', contact: 'hello@proteinmasters.com' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddVendor = () => {
    if (!newVendorName.trim() || !newVendorContact.trim()) return;
    const newVendor = {
      id: Date.now(),
      name: newVendorName.trim(),
      contact: newVendorContact.trim(),
    };
    setVendors([...vendors, newVendor]);
    setNewVendorName('');
    setNewVendorContact('');
  };

  const handleDeleteVendor = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Vendors</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        {loading ? (
          <p className="italic text-gray-600">Loading your badass vendors...</p>
        ) : (
          <>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Vendor Name"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
                value={newVendorName}
                onChange={e => setNewVendorName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Contact Email"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
                value={newVendorContact}
                onChange={e => setNewVendorContact(e.target.value)}
              />
              <button
                onClick={handleAddVendor}
                className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 transition"
              >
                Add Vendor
              </button>
            </div>

            {vendors.length === 0 ? (
              <p className="text-gray-600">No vendors yet. Time to add some hot suppliers!</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-gray-300 py-2">Vendor Name</th>
                    <th className="border-b border-gray-300 py-2">Contact</th>
                    <th className="border-b border-gray-300 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map(({ id, name, contact }) => (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="py-2">{name}</td>
                      <td className="py-2">{contact}</td>
                      <td className="py-2">
                        <button
                          onClick={() => handleDeleteVendor(id)}
                          className="text-red-600 hover:text-red-800 font-bold"
                          title="Kick this vendor out"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Vendors;
