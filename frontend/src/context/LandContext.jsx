import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { landABI, landAddress } from "../Utils/ethers/constants";

export const LandContext = React.createContext();

const { ethereum } = window;

const LandProvider = ({ children }) => {
  const [formData, setformData] = useState({
    landId: "",
    location: "",
    area: "",
    dimensionOfLand: "",
    landIdentificationNumber: "",
    transferAmount: "",
    status: "",
    landType: "",
  });
  
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [LandCount, setLandCount] = useState(localStorage.getItem("LandCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getUserLandsfunc = async (tempAddress) => {
    console.log("in checkIfWalletIsConnect Connected:", tempAddress);
    try {
      if (ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landContract = new ethers.Contract(landAddress, landABI, signer);

        const availableLands = await landContract.getUserLands(tempAddress);
        const structuredTransactions = availableLands.map((transaction) => ({
          landId: transaction.landId,
          location: transaction.location,
          area: transaction.area,
          dimensionOfLand: transaction.dimensionOfLand,
          landIdentificationNumber: transaction.landIdentificationNumber,
          transferAmount: transaction.status,
          status: transaction.landType,
          landType: transaction.transferAmount,
          prevOwner: transaction.prevOwner,
          currentOwner: transaction.currentOwner,
        }));

        console.log("All Transactions : ", structuredTransactions);
        // console.log("In get All Transaction");
        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getUserLandsfunc(accounts[0]);
      } else {
        connectWallet();
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfLandExists = async () => {
    try {
      if (ethereum) {
        // const landContract = createEthereumContract();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landContract = new ethers.Contract(landAddress, landABI, signer);
        // console.log(landContract);
        // console.log("In Check Transaction");
        const currentLandCount = await landContract.getLandCount();

        window.localStorage.setItem("LandCount", currentLandCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const addLandToBlockchain = async (formData) => {
    // console.log("in backend", formData);
    try {
      if (window.ethereum) {
        const {
          location,
          area,
          dimensionOfLand,
          landIdentificationNumber,
          landType,
        } = formData;
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landContract = new ethers.Contract(landAddress, landABI, signer);
        const transactionHash = await landContract.registerLand(
          location,
          area,
          dimensionOfLand,
          landIdentificationNumber,
          landType
        );
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        return transactionHash.hash;
      } else {
        console.log("No ethereum object");
      }
    }
    catch (error) {
      console.log(error);
      throw new Error("Error In Adding Land");
    }
  };

  const transferLandfunc = async (formData) => {
    if (true) {
      if (window.ethereum) {
        const { landId, currentOwnerAddress, transferAmount } = formData;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const landContract = new ethers.Contract(landAddress, landABI, signer);
        const exchangeRate = "50735.67";

        const parsedAmount = ethers.parseEther(transferAmount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: currentOwnerAddress,
              gas: "0x5208",
              value: parsedAmount.toString(16),
            },
          ],
        });
        // console.log("parsedAmount : ", parsedAmount.toString(16));

        const transactionHash = await landContract.transferLand(
          landId,
          currentOwnerAddress, 
          String(parsedAmount)
        );
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
      } else {
        console.log("No ethereum object");
      }
    }
    // catch (error) {
    //   console.log(error);
    //   throw new Error("Error transferring land");
    // }
  };

  useEffect(() => {
    connectWallet();
    checkIfWalletIsConnect();
    // checkIfLandExists();
  }, [LandCount]);

  return (
    <LandContext.Provider
      value={{
        currentAccount,
        LandCount,
        connectWallet,
        transactions,
        isLoading,
        addLandToBlockchain,
        handleChange,
        formData,
        checkIfWalletIsConnect,
        transferLandfunc,
      }}
    >
      {children}
    </LandContext.Provider>
  );
};
export default LandProvider;