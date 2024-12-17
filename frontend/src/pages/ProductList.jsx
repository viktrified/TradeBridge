import React from 'react';
import { Box, AlertCircle, Mail, PenTool, Eye } from 'lucide-react';

const ProductCard = ({ name, description, value, image }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden mb-4 flex flex-col md:flex-row">
    <div className="p-6 flex-grow">
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex items-center space-x-4">
        <span className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center">
          <Box className="mr-2" size={16} />
          {value} eth
        </span>
        <button className="text-gray-400 hover:text-white">
          <Eye size={16} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <PenTool size={16} />
        </button>
      </div>
    </div>
    <div className="md:w-1/3">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
  </div>
);

const ProductList = () => {
  const products = [
    {
      name: "Product name",
      description: "Vulputate magna eleifend leo senectus at arcu. Rhoncus auctor porttitor justo porttitoretiam ultrices. Rhoncus justo porttitor etiam ultrices rhoncuset auto senectus at arcu. Rhoncus auctor porttitor justo porttitoretiam ultrices rhoncus justo porttitor etiam ultrices...",
      value: "1.09",
      image: "/api/placeholder/400/300"
    },
    {
      name: "Product name",
      description: "Vulputate magna eleifend leo senectus at arcu. Rhoncus auctor porttitor justo porttitoretiam ultrices. Rhoncus justo porttitor etiam ultrices rhoncuset auto senectus at arcu. Rhoncus auctor porttitor justo porttitoretiam ultrices rhoncus justo porttitor etiam ultrices...",
      value: "1.09",
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Box className="text-orange-500" />
          <span className="text-orange-500 font-semibold">TradeBridge</span>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="text-gray-400" />
          <span className="text-sm">0x12f34598...64129</span>
          <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
            Add Product +
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <button className="border border-gray-700 px-4 py-2 rounded-full flex items-center bg-gray-800">
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

      <h2 className="text-2xl font-bold mb-6">My products</h2>

      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
