import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../assets/images/trade_bridge.png";
import { ethers } from "ethers";

const Header = ({ setSigner, setAccount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [account, setAccountState] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

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
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="relative min-h-24 flex md:flex-row">
        {/* Left Half - Dark Blue */}
        <div className="w-[57%] bg-[#141C2B] py-4 px-4 md:px-10 flex justify-between items-center relative">
          <Link to="/">
            <div className="flex bg-[#182130] rounded-full items-center py-2 px-3 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <img
                src={Logo}
                alt="Trade Bridge Logo"
                className="w-10 md:w-[32px]"
              />
              <div className="flex items-center ml-2">
                <span className="text-white text-xl md:text-2xl font-bold">
                  Trade
                </span>
                <span className="text-[#ff6b6b] text-xl md:text-2xl font-bold ml-1">
                  Bridge
                </span>
              </div>
            </div>
          </Link>

          <button
            onClick={toggleSidebar}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>

          {/* Bottom Horizontal Line for Left Half */}
          <div className="absolute bottom-[45px] left-64 w-full h-[2px] bg-[#ff6b6b]"></div>
        </div>

        {/* Right Half - Orange */}
        <div className="w-[50%] bg-[#FF531E] py-4 flex justify-end items-center px-4 relative">
          {/* Bottom Horizontal Line for Right Half */}
          <div className="absolute bottom-[45px] left-0 w-[98%] h-[2px] bg-[#141C2B]"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#141C2B] flex flex-col justify-center items-center z-40">
          <button
            onClick={toggleSidebar}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            <AiOutlineClose />
          </button>
          <nav className="flex flex-col items-center space-y-4 text-white">
            <Link to="/" className="text-2xl" onClick={toggleSidebar}>
              Home
            </Link>
            <Link
              to="/market-place"
              className="text-2xl"
              onClick={toggleSidebar}
            >
              Market Place
            </Link>
            <Link to="/contribute" className="text-2xl" onClick={toggleSidebar}>
              Contribute
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
