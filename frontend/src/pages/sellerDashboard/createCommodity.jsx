import React, { useState } from "react";
import axios from "axios";
import { Camera, Box, AlertCircle } from 'lucide-react';
import { ethers } from "ethers";
import TradeBridgeABI from "../../../ABIs/TradeBridge.json";
import { ToastContainer, toast } from 'react-toastify';
import OverlayLoader from "overlay-loading-react";
import 'react-toastify/dist/ReactToastify.css';

const CreateCommodity = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Create Commodity");
  const [commodityName, setCommodityName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [imageCID, setImageCID] = useState(null);
  const [file, setFile] = useState(null);
  const [filePrev, setFilePrev] = useState(null);

  const handleFileChange = async (e) => {
    setIsSubmitting(true);
    setButtonTitle("Uploading File...");
    setFile(e.target.files[0]);
    console.log(e.target.files)
    console.log(file)
    if (e.target.files[0]) {
      console.log(file)
      const data = new FormData();
      data.append('name', commodityName);
      data.append('file', e.target.files[0]);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://uploads.pinata.cloud/v3/files',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT}`
        },
        data: data
      };

      

      try {
        const response = await axios.request(config);

        console.log("Response data:", response.data);
        setSuccess(true);

        const reader = new FileReader();

        reader.onloadend = async () => {
          try {
            const base64Data = reader.result.split(",")[1];
            
            console.log(base64Data)
            
            setFile(e.target.files[0]);
            
            console.log(response.data.data)

            setImage(response.data.data.id)
            setImageCID(response.data.data.cid)
            setFilePrev(base64Data)
            setButtonTitle("Add Commodity")
          } catch (error) {
            console.error("Error uploading file:", error);
          } finally {
            setButtonTitle("Create Commodity")
            setIsSubmitting(false);
          }
        };

        reader.readAsDataURL(e.target.files[0]);

        toast.success("File uploaded successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload file.");
      }

    }
  };

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    setButtonTitle("Adding Commodity...")
    event.preventDefault();
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contractAddress = import.meta.env.VITE_TRADE_BRIDGE_SCA;
        console.log("Contract Address:", contractAddress);

        if (!contractAddress || !ethers.isAddress(contractAddress)) {
          console.error("Invalid contract address:", contractAddress);
          toast.error("Contract address is not defined or invalid.");
          setIsSubmitting(false);
          setButtonTitle("Add Commodity")
          return;
        }

        const commodityContract = new ethers.Contract(
          contractAddress,
          TradeBridgeABI,
          signer
        );
        console.log("Contract Object:", commodityContract);

        const imageURL = `https://gateway.pinata.cloud/ipfs/${image}`;

        console.log(
          commodityName,
          description,
          quantity,
          measurement,
          ethers.parseUnits(price.toString(), 18),
          image,
          imageCID,
          location
        );

        if (!commodityName || !description || !quantity || !measurement || !price || !image || !imageCID || !location) {
          toast.error("All fields are required.");
          setIsSubmitting(false);
          setButtonTitle("Add Commodity")
          return;
        }

        const tx = await commodityContract.addCommodity(
          commodityName,
          description,
          quantity,
          measurement,
          ethers.parseUnits(`${price}`, 18),
          image,
          imageCID,
          location
        );

        await tx.wait();
        toast.success("Commodity created successfully!");
        setSuccess(true);
        setIsSubmitting(false);
        
        setCommodityName("");
        setQuantity("");
        setMeasurement("");
        setPrice("");
        setDescription("");
        setLocation("");
        setImage(null);
        setImageCID(null);
        setFile(null);
        setFilePrev(null);

        setButtonTitle("Create Commodity");
      } catch (error) {
        console.error("Error creating commodity:", error);
        toast.error("Failed to create commodity. Check console for details.");
        setIsSubmitting(false);
        setButtonTitle("Add Commodity")
      }
    } else {
      toast.error("Please install MetaMask to use this feature.");
      setIsSubmitting(false);
      setButtonTitle("Add Commodity")
    }
  };

  return (
    <div className="bg-gray-900">
      <ToastContainer />
      <h1 className="text-xl text-white font-normal p-10 pb-0 mb-2 flex justify-center">Create Commodities</h1>
      <div className="p-10 pt-0 flex justify-center">
        {/* Form for creating a commodity */}
        <form className="space-y-2 w-[700px]" id="addCommodity" onSubmit={handleSubmit}>
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
            <label className="text-white block mb-2 text-sm font-medium">PRICE PER QUANTITY (ETH):</label>
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
                onChange={handleFileChange}
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
            {file && (
              <div className="flex items-center justify-center">
                <img
                  src={`data:image/png;base64,${filePrev}`}
                  alt="Uploaded Preview"
                  className="mt-2 h-40 w-auto rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition duration-300"
            >
              {buttonTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommodity;
