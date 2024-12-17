import AgricImage from '../assets/images/agric-com.jpg';
import SolidImage from '../assets/images/solid-comm.jpg';
import colbat from '../assets/images/colbat.jpg';
import peanut from '../assets/images/peanut.jpg';
import soybean from '../assets/images/soy-bean.jpg';
import rice from '../assets/images/rice.jpg';
import diamond from '../assets/images/diamond.jpg';
import copper from '../assets/images/copper.jpg'
import coffee from '../assets/images/coffee.jpg'
import silver from '../assets/images/silver.jpg'

const images = {
  agricultural: [
    { name: 'Soybean', available: '20 tonnes', price: '0.005 ETH', image: soybean, sellerAddress: '0x123...' },
    { name: 'rice', available: '50 tonnes', price: '0.002 ETH', image: rice, sellerAddress: '0x123...' },
    { name: 'Peanut', available: '35 tonnes', price: '0.003 ETH', image: peanut, sellerAddress: '0x123...' },
    { name: 'Coffee', available: '15 tonnes', price: '0.007 ETH', image: coffee, sellerAddress: '0x123...' },
    { name: 'Cocoa', available: '40 tonnes', price: '0.010 ETH', image: AgricImage, sellerAddress: '0x123...' },
  ],
  solidMinerals: [
    { name: 'Gold', available: '10 tonnes', price: '0.050 ETH', image: SolidImage, sellerAddress: '0x456...' },
    { name: 'Silver', available: '20 tonnes', price: '0.030 ETH', image: silver, sellerAddress: '0x456...' },
    { name: 'Diamond', available: '60 tonnes', price: '0.015 ETH', image: diamond, sellerAddress: '0x456...' },
    { name: 'Colbat', available: '100 tonnes', price: '0.012 ETH', image: colbat, sellerAddress: '0x456...' },
    { name: 'Copper', available: '80 tonnes', price: '0.020 ETH', image: copper, sellerAddress: '0x456...' },
  ],
};

export default images; 
