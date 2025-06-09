import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Simulate fetching categories like a pro
    setTimeout(() => {
      setCategories(['Electronics', 'Clothes', 'Books', 'Toys', 'Home']);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return; // No empty shit, babe
    if (categories.includes(trimmed)) return; // No copycats
    setCategories([...categories, trimmed]);
    setNewCategory('');
  };

  const handleDeleteCategory = (catToDelete) => {
    setCategories(categories.filter(cat => cat !== catToDelete));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Categories</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <p className="text-gray-600 italic">Loading your badass categories, babe...</p>
        ) : (
          <>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Add new category..."
                className="border border-gray-300 rounded px-3 py-2 flex-grow focus:outline-indigo-500"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
              />
              <button
                onClick={handleAddCategory}
                className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
            {categories.length === 0 ? (
              <p className="text-gray-600">No categories? What a damn boring place.</p>
            ) : (
              <ul className="space-y-3 text-gray-800">
                {categories.map((cat, idx) => (
                  <li
                    key={idx}
                    className="border-b border-gray-200 py-2 flex justify-between items-center font-medium hover:text-indigo-600 cursor-pointer"
                  >
                    {cat}
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      className="text-red-600 hover:text-red-800 font-bold"
                      title="Delete this category"
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

export default Categories;
