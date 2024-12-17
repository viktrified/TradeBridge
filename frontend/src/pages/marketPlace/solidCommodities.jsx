import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Skeleton from "../../components/Skeleton";

const SolidCommodities = () => {
  const location = useLocation();
  const { commodities = [], sellerAddress } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(commodities.length / itemsPerPage);
  
  // Get current commodities for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = commodities.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8 mx-40 mt-40">
      <h1 className="text-2xl font-bold mb-4">Solid Mineral Commodities</h1>
      {sellerAddress ? (
        <p className="mb-4">
          <strong>Seller Address:</strong> {sellerAddress}
        </p>
      ) : (
        <Skeleton width="200px" height="20px" className="mb-4" />
      )}

      <div className="grid grid-cols-3 gap-12">
        {commodities.length === 0 ? (
          // Render a skeleton for each item when there are no commodities
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="border rounded-lg shadow-md">
              <Skeleton height="200px" className="rounded-t-lg" />
              <div className="p-2 bg-white rounded-b-lg">
                <Skeleton width="80%" height="20px" className="mb-2" />
                <Skeleton width="60%" height="20px" className="mb-1" />
                <Skeleton width="60%" height="20px" />
              </div>
            </div>
          ))
        ) : (
          currentItems.map((commodity, index) => (
            <div key={index} className="border rounded-lg shadow-md">
              <img src={commodity.image} alt={commodity.name} className="h-48 w-full object-cover rounded-t-lg" />
              <div className="p-2 bg-white rounded-b-lg">
                <h2 className="text-lg font-semibold mb-2">{commodity.name}</h2>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p>Available</p>
                    <p>{commodity.available}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Price per Ton</p>
                    <p>{commodity.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {/* Show pagination controls even when there are no commodities */}
        {Array.from({ length: Math.max(totalPages, 1) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SolidCommodities;
