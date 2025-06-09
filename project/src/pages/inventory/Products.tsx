import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');

  useEffect(() => {
    // Simulate fetching real products like a pro
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Boxing Gloves', price: 49.99, stock: 15 },
        { id: 2, name: 'Protein Powder', price: 29.99, stock: 50 },
        { id: 3, name: 'Fitness Tracker', price: 99.99, stock: 10 },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const handleAddProduct = () => {
    if (!newProductName.trim() || !newProductPrice || !newProductStock) return;
    const newProduct = {
      id: Date.now(),
      name: newProductName.trim(),
      price: parseFloat(newProductPrice),
      stock: parseInt(newProductStock),
    };
    setProducts([...products, newProduct]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductStock('');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(prod => prod.id !== id));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="mt-2 text-sm text-gray-600">Manage your product inventory</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <p className="italic text-gray-600">Loading your badass products...</p>
        ) : (
          <>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Product name"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
                value={newProductName}
                onChange={e => setNewProductName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price ($)"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
                value={newProductPrice}
                onChange={e => setNewProductPrice(e.target.value)}
                min="0"
                step="0.01"
              />
              <input
                type="number"
                placeholder="Stock quantity"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
                value={newProductStock}
                onChange={e => setNewProductStock(e.target.value)}
                min="0"
                step="1"
              />
              <button
                onClick={handleAddProduct}
                className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 transition"
              >
                Add Product
              </button>
            </div>

            {products.length === 0 ? (
              <p className="text-gray-600">No products yet. Add some sexy shit!</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-gray-300 py-2">Name</th>
                    <th className="border-b border-gray-300 py-2">Price ($)</th>
                    <th className="border-b border-gray-300 py-2">Stock</th>
                    <th className="border-b border-gray-300 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(({ id, name, price, stock }) => (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="py-2">{name}</td>
                      <td className="py-2">{price.toFixed(2)}</td>
                      <td className="py-2">{stock}</td>
                      <td className="py-2">
                        <button
                          onClick={() => handleDeleteProduct(id)}
                          className="text-red-600 hover:text-red-800 font-bold"
                          title="Delete this product"
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

export default Products;
