import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TradeBridgeABI from "../../../ABIs/TradeBridge.json";
import Skeleton from "../../components/Skeleton";
import Logo from "../../assets/images/trade_bridge.png";
import { getSignedUrlFromPinata, checkWalletConnection } from "../../utils/functions";

const Purchase = () => {
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [account, setAccount] = useState(null);
  const [accountState, setAccountState] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Purchase Commodity");
  const [quantity, setQuantity] = useState(0);
  const [actualPrice, setActualPrice] = useState(0);
  const [price, setPrice] = useState("0 ETH");

  const location = useLocation();
  
  const { commodityChoice } = location.state || {};

  console.log(commodityChoice)

  useEffect(() => {
    if (!commodityChoice || commodityChoice == "undefined") {
      toast.error("Invalid commodity data.");
      setShouldNavigate(true);
    } else {
      try {
        JSON.parse(commodityChoice);
      } catch (e) {
        console.error("Failed to parse commodityChoice:", e);
        toast.error("Invalid commodity data.");
        setShouldNavigate(true);
      }
    }
  }, [commodityChoice]);

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/market-place');
    }
  }, [shouldNavigate, navigate]);

  let commodity;
  try {
    commodity = JSON.parse(commodityChoice);
  } catch (e) {
    console.error("Failed to parse commodityChoice:", e);
    toast.error("Invalid commodity data.");
    navigate('/market-place');
    return null;
  }

  console.log(commodity);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask detected");
      console.log('clicked')
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        const userSigner = await provider.getSigner();
        const accounts = await provider.listAccounts();
        
        setSigner(userSigner);
        setAccount(accounts[0]);
        setAccountState(accounts[0]);
        console.log("Connected account:", accounts[0]);
        window.reload;
      } catch (error) {
        if (error.code === 4001) {
          console.error("User rejected the request.");
          alert("You rejected the connection request. Please connect to use the app.");
        } else {
          console.error("Error fetching accounts or connecting to MetaMask:", error);
        }
      }
    } else {
      console.error("MetaMask not installed. Please install MetaMask to use this app.");
      alert("MetaMask not installed. Please install it to proceed.");
    }
  };

   const disconnectWallet = () => {
    setAccountState(null);
    setAccount(null);
    setSigner(null);
    setDropdownOpen(false);
    console.log("Wallet disconnected");
    window.location.reload();
  };

  useEffect(() => {
      const checkConnection = async () => {
        await checkWalletConnection(setAddress, setAccount, setAccountState, setSigner, setError);
    };
    
    checkConnection();

    const accountsChangedHandler = (accounts) => {
      if (accounts.length > 0) {
        console.log(accounts[0])
        setAccountState(accounts[0]);
        setAccount(accounts[0]);
      } else {
        disconnectWallet();
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChangedHandler);
      window.ethereum.on("disconnect", disconnectWallet);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", accountsChangedHandler);
        window.ethereum.removeListener("disconnect", disconnectWallet);
      }
    };
  }, []);

   useEffect(() => {
    if (quantity > 0 && commodity) {
      const calculatedPrice = quantity * (commodity[6] / 1e18);
      console.log(calculatedPrice)
      setActualPrice(calculatedPrice)
      setPrice(`${calculatedPrice} ETH`);
    } else {
      setPrice(0);
    }
  }, [quantity, commodity]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA; 
        console.log(contractAddress)
        const commodityContract = new ethers.Contract(contractAddress, TradeBridgeABI, signer);

        console.log("Commodity ID:", commodity[0]);
        console.log("Quantity:", quantity);

        const purchase = await commodityContract.buyCommodity(commodity[0], quantity, {
          gasLimit: 300000,
        });
        await purchase.wait();
        console.log("Purchase successful:", purchase);
      } catch (error) {
        console.error("Error during purchase:", error);
        toast.error("Error during purchase. Check console for details.");
      }
    } else {
      alert("Please install MetaMask to purchase commodities.");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 py-8 px-16">
      <ToastContainer />
      {/* Top Navigation Bar */}
      <div className="flex justify-between  border border-white py-3 px-5 rounded-full items-center mb-4">
        {/* Logo */}
        <div className="flex gap-2">
          <Link to="/" className="flex">
            <img
              src={Logo}
              alt="Trade Bridge Logo"
              className="w-10 md:w-[32px]"
            />
            <span className="mr-4 text-white text-3xl font-bold">
              Trade<span className="text-orange-500">Bridge</span>
            </span>
          </Link>
        </div>

        {/* Connect Wallet Button */}
        {!address ? (
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-[#FF531E] rounded-full"
          >
            Connect Wallet
          </button>
        ) : (
          <button className="px-4 py-2 bg-[#FF531E] rounded-full">{`${address.slice(
            0,
            6
          )}...${address.slice(-4)}`}</button>
        )}
      </div>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-3xl text-white text-center font-normal mb-6">
          Purchase Commodity{" "}
          <Link
            to="/market-place"
            className="text-sm px-6 py-2 text-center justify-center text-white bg-orange-500 w-full mt-10 rounded-full hover:bg-orange-700"
          >
            Back to market place
          </Link>
        </h1>
        <div></div>
        <div className="flex justify-center">
          {commodity ? (
            <div className="border rounded-lg shadow-md space-y-3 p-6 w-full max-w-lg">
              {" "}
              {/* Adjust width here */}
              <div className="mb-4">
                <p>
                  <strong>Commodity:</strong> {commodity[2]}
                </p>
                <p className="mt-2">
                  <strong>Available Quantity:</strong> {commodity[4].toString()}
                </p>
                <p className="mt-2">
                  <strong>Price per {commodity[5]}:</strong>{" "}
                  {commodity[6].toString() / 10e18} ETH
                </p>
                <p className="mt-2">
                  <strong>Description:</strong> {commodity[3]}
                </p>
                <p className="mt-5">
                  <strong>Seller Address:</strong>{" "}
                  <input
                    type="text"
                    value={commodity[1]}
                    readOnly
                    className="appearance-none bg-transparent mt-2 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </p>
              </div>
              <div className="space-y-3 mt-2">
                <label className="block mb-2">Quantity:</label>
                <input
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                  className="appearance-none bg-transparent mt-1 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
              <div className="mt-5">
                <label className="block">Amount:</label>
                <input
                  type="text"
                  value={price}
                  readOnly
                  className="appearance-none bg-transparent mt-1 border-b w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
              <button
                onClick={handlePurchase}
                disabled={isSubmitting}
                className="px-6 py-2 text-white bg-orange-500 w-full mt-10 rounded-full hover:bg-orange-700"
              >
                Submit Purchase Request
              </button>
            </div>
          ) : (
            <p>No commodity selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
