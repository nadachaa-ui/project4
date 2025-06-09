import React, { useState, useEffect, KeyboardEvent } from 'react';

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newBrand, setNewBrand] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setBrands(['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour']);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer); // cleanup timer on unmount
  }, []);

  const handleAddBrand = () => {
    const trimmed = newBrand.trim();
    if (trimmed === '') return; // no empty shit allowed
    if (brands.includes(trimmed)) return; // no duplicates, babe
    setBrands([...brands, trimmed]);
    setNewBrand('');
  };

  const handleDeleteBrand = (brandToDelete: string) => {
    setBrands(brands.filter(brand => brand !== brandToDelete));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddBrand();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Brands</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <p className="text-gray-600 italic">Loading your badass brands, babe...</p>
        ) : (
          <>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 flex-grow focus:outline-indigo-500"
                placeholder="Add new brand..."
                value={newBrand}
                onChange={e => setNewBrand(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleAddBrand}
                className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
            {brands.length === 0 ? (
              <p className="text-gray-600">No brands found. What a sad ass world.</p>
            ) : (
              <ul className="space-y-3 text-gray-800">
                {brands.map((brand) => (
                  <li
                    key={brand}
                    className="border-b border-gray-200 py-2 flex justify-between items-center font-medium hover:text-indigo-600 cursor-pointer"
                  >
                    {brand}
                    <button
                      onClick={() => handleDeleteBrand(brand)}
                      className="text-red-600 hover:text-red-800 font-bold"
                      title="Delete this brand"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Brands;
