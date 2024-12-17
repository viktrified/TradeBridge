import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TradeBridgeABI from '../../../ABIs/TradeBridge.json';

const ViewPurchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your contract address
  const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        // Connect to Ethereum provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Create contract instance
        const tradeBridgeContract = new ethers.Contract(contractAddress, TradeBridgeABI, signer);

        // Fetch purchase data (update the method according to your contract)
        const userAddress = await signer.getAddress();
        const purchasesData = await tradeBridgeContract.getPurchasesByUser(userAddress);

        // Process the data if necessary
        setPurchases(purchasesData);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [contractAddress]);

  if (loading) {
    return <div>Loading purchases...</div>;
  }

  return (
    <div className='p-8 mx-40 mt-24'>
      <h1 className='text-2xl font-bold mb-4'>My Purchases</h1>
      {purchases.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          {purchases.map((purchase, index) => (
            <div key={index} className='border rounded-lg shadow-md p-4'>
              <h2 className='text-lg font-semibold'>{purchase.name}</h2>
              <p><strong>Price:</strong> {ethers.utils.formatEther(purchase.price)} ETH</p>
              <p><strong>Quantity:</strong> {purchase.quantity}</p>
              <p><strong>Date:</strong> {new Date(purchase.date * 1000).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPurchase;
