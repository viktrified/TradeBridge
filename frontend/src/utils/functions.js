import { ethers } from "ethers";
import { toast } from "react-toastify";

export async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask detected");
        console.log('clicked')
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          
          await window.ethereum.request({ method: "eth_requestAccounts" });
          
          const userSigner = await provider.getSigner();
          const accounts = await provider.listAccounts();
          
          console.log("Connected account:", accounts[0]);
          
          return { userSigner, accounts };

        } catch (error) {
          if (error.code === 4001) {
            console.error("User rejected the request.");
            toast.error("You rejected the connection request. Please connect to use the app.");
            return false;
          } else {
            console.error("Error fetching accounts or connecting to MetaMask");
            return false;
          }
        }
      } else {
          console.error("MetaMask not installed. Please install MetaMask to use this app.");
          toast.error("MetaMask not installed. Please install it to proceed.");
          return false;
      }
}

export const getImageFromPinata = async (identifier) => {
  try {
    const url = `${PINATA_API_URL}/pinning/unpin/${identifier}`;

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${PINATA_API_KEY}:${PINATA_API_SECRET}`,
      },
    });

    if (isCid) {
      return `https://gateway.pinata.cloud/ipfs/${identifier}`;
    } else {
      const pinataItem = response.data.rows[0];
      if (pinataItem) {
        return `https://gateway.pinata.cloud/ipfs/${pinataItem.ipfs_hash}`;
      } else {
        throw new Error('No image found with the given Pinata ID.');
      }
    }
  } catch (error) {
    console.error('Error fetching image from Pinata:', error);
    throw new Error('Could not fetch image URL');
  }
};

export const getSignedUrlFromPinata = async (cid) => {
  
  const fileUrl = `https://${import.meta.env.VITE_PINATA_GATEWAY}/${cid}`;

  console.log(fileUrl)
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: fileUrl,
      expires: 500000,
      date: Math.floor(Date.now() / 1000),
      method: 'GET',
    }),
  };

  try {
    const response = await fetch(import.meta.env.VITE_PINATA_API_URL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.data)
    return data.data;
  } catch (error) {
    console.error('Error fetching signed URL from Pinata:', error);
    throw new Error('Could not fetch signed URL');
  }
};

export const checkWalletConnection = async (setAddress, setAccount, setAccountState, setSigner, setError) => {
  if (window.ethereum) {
      try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
              const userAddress = await signer.getAddress();
              const accounts = await provider.listAccounts();
              
              setSigner(signer);
              setAccount(accounts[0]);
              setAccountState(accounts[0]);
              setAddress(userAddress);
          } else {
              setError('No accounts found. Please connect your wallet.');
          }
      } catch (err) {
          setError('Error connecting to wallet: ' + err.message);
      }
  } else {
      setError('Ethereum provider not found. Please install MetaMask.');
  }
};