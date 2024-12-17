import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TradeBridgeABI from "../../../ABIs/TradeBridge.json";
import { getSignedUrlFromPinata } from "../../utils/functions";

const MyCommodity = () => {
  const [commodities, setCommodities] = useState([]);
  
  useEffect(() => {
    const fetchCommodities = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA; 
          const commodityContract = new ethers.Contract(contractAddress, TradeBridgeABI, signer);

         
          const userAddress = await signer.getAddress();
          const userCommodities = await commodityContract.getCommoditiesByUser(userAddress);
          console.log(userCommodities)
          setCommodities(userCommodities);
        } catch (error) {
          console.error("Error fetching commodities:", error);
        }
      }
    };

    fetchCommodities();
  }, []);

  const getImg = async function(cid) {
    return await getSignedUrlFromPinata(cid);
  }

  return (
    <div className="bg-gray-900">
       <h1 className="text-xl text-white font-normal p-10 mb-4">My Commodities</h1>
    <div className="p-10 flex justify-center h-screen">
     
      <div className="grid grid-cols-5 gap-12">
        {commodities.map((commodity, index) => (
          <div key={index} className="border rounded-lg bg-white shadow-md w-72 h-72">
            <div className="h-48 overflow-hidden mb-4">
              <img src="/trade_bridge.png" alt={commodity[2]} className="h-full w-full object-contain rounded-t-lg" />
            </div>
            <div className="p-2 h-28 bg-white rounded-b-lg">
              <h2 className="text-lg font-semibold mb-2">{commodity[2]}</h2>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p>Available</p>
                  <p>{commodity[4].toString()}</p>
                </div>
                <div className="flex justify-between">
                  <p>Price per {commodity[5]}</p>
                  <p>{commodity[6].toString()/1000000000000000000} ETH</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MyCommodity;
