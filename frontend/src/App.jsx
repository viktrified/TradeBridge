import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import BuyerDashboard from "./pages/buyerDashboard/BuyerDashboard";
import SellerDashboard from "./pages/sellerDashboard/SellerDashboard";
import Dispute from "./pages/sellerDashboard/Dispute";
import CreateCommodity from "./pages/sellerDashboard/createCommodity";
import Orders from "./pages/sellerDashboard/Orders";
import MarketPlace from "./pages/marketPlace/MarketPlace";
import MyCommodity from "./pages/sellerDashboard/MyCommodity";
import PurchaseCommodity from "./pages/buyerDashboard/Purchase";
import ViewPurchase from "./pages/buyerDashboard/ViewPurchase";
import DisputeSale from "./pages/buyerDashboard/Dispute";

function App() {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const location = useLocation();
  
  // Determine if the current path is one of the pages where the Navbar should be visible
  const isHeroPage = [
    "/",
    "/hero"
  ].includes(location.pathname);

  
  // Determine if the current path is one of the pages where the Navbar should be visible
  const showNavbar = [
    "/seller-dashboard",
    "/seller-dashboard/create-commodity",
    "/seller-dashboard/my-commodity",
    "/seller-dashboard/orders",
    "/seller-dashboard/dispute"
  ].includes(location.pathname);

  const showNavbarTwo = [
    "/buyer-dashboard",
    "/buyer-dashboard/purchase-commodity",
    "/buyer-dashboard/view-purchase",
    "/buyer-dashboard/dispute-sale"
  ].includes(location.pathname);

  const showNavbarThree = [
    "/market-place",
    "/market-place/agro-commodities",
    "/market-place/solid-commodities",
  ].includes(location.pathname);

  return (
    <div className="App flex flex-col min-h-screen">
      {/* Header is only visible on the Hero page */}
      {isHeroPage && <Header setSigner={setSigner} setAccount={setAccount} />}
      
      {/* Show Navbar only for specified routes */}
      {showNavbar && <Navbar />}

      {/* Main content */}
      <main className="flex-grow w-auto h-auto bg-gray-200">
      
        <Routes>
          {/* Route for Hero */}
          <Route path="/" element={<Hero />} />

          {/* Seller Dashboard */}
          <Route path="/seller-dashboard" element={<SellerDashboard signer={signer} />} />
          <Route path="/seller-dashboard/create-commodity" element={<CreateCommodity />} />
          <Route path="/seller-dashboard/orders" element={<Orders />} />
          <Route path="/seller-dashboard/my-commodity" element={<MyCommodity />} />
          <Route path="/seller-dashboard/dispute" element={<Dispute />} />

          {/* Buyer Dashboard */}
          <Route path="/buyer-dashboard" element={<BuyerDashboard signer={signer} />} />
          <Route path="/buyer-dashboard/purchase-commodity" element={<PurchaseCommodity />} />
          <Route path="/buyer-dashboard/view-purchase" element={<ViewPurchase />} />
          <Route path="/buyer-dashboard/dispute-sale" element={<DisputeSale />} />

          {/* Marketplace */}
          <Route path="/market-place" element={<MarketPlace signer={signer} />} />
        </Routes>
      </main>

      {/* Footer */}
    </div>
  );
}

// Wrap the App component with Router
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
