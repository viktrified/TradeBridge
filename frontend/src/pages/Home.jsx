import React from 'react';
import { Box } from 'lucide-react';

const TradeBridgeLanding = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="p-6">
        <div className="flex items-center space-x-2">
          <Box className="text-orange-500" />
          <span className="text-orange-500 font-semibold">TradeBridge</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empower Your Shopping Experience with Web3
          </h1>
          <div className="mb-8">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm mb-4 w-full md:w-auto">
              Get Started
            </button>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full mb-4 flex items-center justify-center">
            <Box className="mr-2" size={20} />
            Connect wallet as a Buyer
          </button>
          <button className="bg-transparent border border-orange-500 hover:bg-orange-500 hover:bg-opacity-10 text-orange-500 px-6 py-3 rounded-full flex items-center justify-center">
            <Box className="mr-2" size={20} />
            Connect wallet as a Seller
          </button>
        </div>
        <div className="w-full md:w-1/2 bg-orange-500 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <img src="/api/placeholder/600/400" alt="Shopping Cart Illustration" className="object-cover w-full h-full" />
          </div>
          <div className="relative z-10 mt-8 md:mt-0">
            <p className="text-lg mb-4">
              Discover exclusive products and enjoy decentralized ownership in every purchase.
            </p>
            <p className="text-xl font-semibold">
              Seamless, secure transactions with token-based payments. Welcome to the future of e-commerce
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradeBridgeLanding;
