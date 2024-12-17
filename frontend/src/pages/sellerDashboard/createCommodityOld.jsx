import React, { useState } from "react";
import { Camera, Box, AlertCircle } from 'lucide-react';
import Buttons from "../../components/Buttons";
// Import ethers and your contract's ABI
import { ethers } from "ethers";
import { PinataSDK } from "pinata";
import TradeBridgeABI from "../../../TradeBridge.json";
import Navbar from "../../components/Navbar";
// require("dotenv").config();

const CreateCommodity = () => {
  const pinata = new PinataSDK({
    pinataJwt:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmYxZmFiYy0xYzAxLTRiOTItYTYzOS1iNjNjYTQ1NTY4NmEiLCJlbWFpbCI6Imt2bmc2NTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJkYzg1NGRjMTI4YTMwYjUzNTY0Iiwic2NvcGVkS2V5U2VjcmV0IjoiODlmZmU4NGRkZjQ4MDgwZGRlZDEzZTkwYjJiMzIzODY4M2NkMjY1ODFhOTQwOGFmNjcxNmJkNWM0YmIzN2Q2ZCIsImV4cCI6MTc1ODkyOTU4NH0.8V2wO6sqlAkZGwkA28rf32DyeekyGjjRykhWAx62Iz8",
    pinataGateway: "cyan-hilarious-cuckoo-772.mypinata.cloud",
  });
  
  const [commodityName, setCommodityName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageFour, setImageFour] = useState(null);

  const handleImageUpload = async (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64Data = reader.result.split(",")[1];
          const blob = new Blob([
            new Uint8Array(
              await (await fetch(`data:image/jpeg;base64,${base64Data}`)).blob()
            ),
          ]);

          // Upload to Pinata
          const upload = await pinata.upload.file(blob, {
            pinataMetadata: { name: file.name },
          });
          console.log(upload);

          // Store the image CID in state
          setImage(upload.cid);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // async function upload() {
  //   try {
  //     const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
  //     const upload = await pinata.upload.file(file);
  //     console.log(upload);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await Promise.all([
      image
        ? Promise.resolve(image)
        : handleImageUpload(
            document.querySelector('input[type="file"]'),
            setImage
          ),
    ]);

    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA;
        console.log("Contract Address:", contractAddress);
        
        if (!contractAddress || !ethers.isAddress(contractAddress)) {
          console.error("Invalid contract address:", contractAddress);
          alert("Contract address is not defined or invalid.");
          return;
        }
        
        const commodityContract = new ethers.Contract(
          contractAddress,
          TradeBridgeABI,
          signer
        );
        console.log("Contract Object:", commodityContract);
        // console.log(
        //   "Available Functions:",
        //   Object.keys(commodityContract.functions)
        // );

        // Call the createCommodity function
        const tx = await commodityContract.addCommodity(
          commodityName,
          description,
          quantity,
          measurement,
          price,
          image,
          "imageTwo",
          "imageThree",
          "imageFour",
          location
        );

        await tx.wait(); // Wait for the transaction to be mined
        alert("Commodity created successfully!");
      } catch (error) {
        console.error("Error creating commodity:", error);
        alert("Failed to create commodity. Check console for details.");
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  return (
    <div className="bg-gray-900">
       <h1 className="text-xl text-white font-normal p-10 pb-0 mb-2 flex justify-center">Create Commodities</h1>
    <div className="p-10 pt-0 flex justify-center">
      {/* Form for creating a commodity */}
      <form className="space-y-2 w-[700px]" onSubmit={handleSubmit}>
        <div>
          <label className="text-white block mb-2 text-sm font-medium">COMMODITY NAME:</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="Enter commodity name"
            value={commodityName}
            onChange={(e) => setCommodityName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-white block mb-2 text-sm font-medium">COMMODITY QUANTITY:</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="Enter available quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label className="text-white block mb-2 text-sm font-medium">QUANTITY MEASUREMENT:</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="E.g (Kg, tonnes)"
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
          />
        </div>
        <div>
        <label className="text-white block mb-2 text-sm font-medium">PRICE PER QUANTITY:</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="text-white block mb-2 text-sm font-medium">COMMODITY LOCATION:</label>
          <input
            type="text"
            className="border rounded-xl w-full p-3"
            placeholder="E.g (Abuja, Accra, etc)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="text-white block mb-2 text-sm font-medium">COMMODITY DESCRIPTION:</label>
          <textarea
            className="border rounded-xl w-full p-3"
            placeholder="Enter commodity description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-full max-w-md mx-auto">
      <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-900">
        Upload Image
      </label>
      <div className="relative">
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(event) => handleImageUpload(event, setImage)}
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Camera className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 10MB)</p>
          </div>
        </label>
      </div>
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Uploaded Preview"
            className="max-h-40 w-auto mx-auto rounded-lg"
          />
        </div>
      )}
    </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition duration-300"
          >
            Create Commodity
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateCommodity;
