import React, { useState } from 'react';
import { Camera, Box, AlertCircle } from 'lucide-react';

const ProductForm = () => {
  const [amount, setAmount] = useState('0.1824');

  return (
    <div className="bg-gray-900 mt-20 text-gray-300 p-6 rounded-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Box className="text-orange-500" />
          <span className="text-orange-500 font-semibold">TradeBridge</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">0x12f34598...64129</span>
          <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
            Add Product +
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <button className="border border-gray-700 px-4 py-2 rounded-full flex items-center">
          <Box className="mr-2" size={16} />
          My Products
        </button>
        <button className="border border-gray-700 px-4 py-2 rounded-full flex items-center">
          <AlertCircle className="mr-2" size={16} />
          Disputes
        </button>
        <button className="border border-gray-700 px-4 py-2 rounded-full flex items-center ml-auto">
          Create a ticket
        </button>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">PRODUCT NAME:</label>
          <input
            type="text"
            className="w-full bg-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">DESCRIPTION:</label>
          <textarea
            className="w-full bg-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={3}
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Amount</label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800 rounded-md p-2 pr-16 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute right-2 top-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
              BTC
            </span>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
          <Camera className="mx-auto mb-4" size={48} />
          <p className="text-sm mb-2">UPLOAD PHOTO</p>
          <p className="text-xs text-gray-500">
            ATTACH FILE FILE SIZE SHOULD NOT EXCEED 10MB
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition duration-300"
        >
          Add New Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
