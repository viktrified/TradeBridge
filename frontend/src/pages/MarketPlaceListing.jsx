import React from 'react';
import { Box, Search, Sliders, ShoppingCart } from 'lucide-react';

const TopRatedProduct = ({ image, name, rating, price }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4 flex justify-between items-end">
      <div>
        <h3 className="text-white font-semibold">{name}</h3>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-1">★★★★★</span>
          <span className="text-sm text-gray-400">{rating}</span>
        </div>
        <p className="text-orange-500">{price} eth</p>
      </div>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
        Purchase
      </button>
    </div>
  </div>
);

const TrendingProduct = ({ image, name, description, price }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden">
    <img src={image} alt={name} className="w-full h-32 object-cover" />
    <div className="p-4">
      <h3 className="text-white font-semibold mb-2">{name}</h3>
      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-orange-500">{price} eth</span>
        <button className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
          Purchase
        </button>
      </div>
    </div>
  </div>
);

const TopVendor = ({ image, address }) => (
  <div className="flex items-center space-x-2 bg-gray-800 rounded-full p-2 mb-2">
    <img src={image} alt="Vendor" className="w-8 h-8 rounded-full" />
    <span className="text-gray-400 text-sm">{address}</span>
  </div>
);

const Marketplace = () => {
  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Box className="text-orange-500" />
          <span className="text-orange-500 font-semibold">TradeBridge</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">0x12f45598...64129</span>
          <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
            <ShoppingCart size={16} className="mr-2" />
            Cart
          </button>
        </div>
      </header>

      <div className="flex space-x-4 mb-8">
        <div className="relative">
          <select className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full appearance-none">
            <option>Categories</option>
          </select>
          <Box className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} />
        </div>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center">
          <Sliders size={16} className="mr-2" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <h2 className="text-xl font-bold mb-4">Top rated</h2>
          <TopRatedProduct
            image="/api/placeholder/800/400"
            name="Product name"
            rating="4.5"
            price="1.09"
          />

          <h2 className="text-xl font-bold my-6">Trending</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <TrendingProduct
                key={i}
                image={`/api/placeholder/400/300`}
                name={`Product name ${i}`}
                description="Vulputate magna eleifend leo senectus at arcu. Rhoncus auctor porttitor justo porttitoretiam ultrices."
                price="1.09"
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Top Vendors</h2>
          {[1, 2, 3, 4].map((i) => (
            <TopVendor
              key={i}
              image={`/api/placeholder/100/100`}
              address={`0x12f45${i}98...64129`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
