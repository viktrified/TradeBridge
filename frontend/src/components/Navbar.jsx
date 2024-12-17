import React from 'react'
import Logo from "../assets/images/trade_bridge.png"
import { FaPlus, FaBoxOpen, FaGavel, FaTicketAlt } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'
// import { connectWallet } from "../utils/functions";

const Navbar = () => {
  return (
    <div className='bg-gray-900 pt-5'>
         {/* Top Navigation Bar */}
     <header className="flex justify-between items-center py-4 px-10 border rounded-full mx-5 bg-gray-800">
        <div className="text-2xl font-bold flex gap-2 items-center">
          <Link to="/" className='flex gap-2'>
          <img
            src={Logo}
            alt="Trade Bridge Logo"
            className="w-10 md:w-[32px]"
          />
          <span className="mr-4 text-white">Trade<span className='text-orange-500'>Bridge</span></span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-orange-500 rounded-full px-4 py-2"></button>
          <Link to="/seller-dashboard/create-commodity" className="px-4 py-2 bg-orange-500 rounded-full flex items-center">
            <FaPlus className="mr-2" /> Add Product
          </Link>
        </div>
      </header>

      <div className="flex justify-between space-x-4 py-4 px-10 border rounded-full mx-5 mt-4 bg-gray-800">
            <div className='flex gap-4'>
            <Link to="seller-dashboard/my-commodity" className="px-4 py-2 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center">
              <FaBoxOpen className="mr-2" /> My Products
            </Link>
            <Link to="/disputes" className="px-4 py-2 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center">
              <FaGavel className="mr-2" /> Disputes
            </Link>
            </div>
            <div>
            <Link to="/create-ticket" className="px-4 py-2 bg-orange-500 rounded-full flex items-center">
            {/* <FaTicketAlt className="mr-2" /> Create a ticket */}
          </Link>
          </div>
          </div>

    </div>
  )
}

export default Navbar