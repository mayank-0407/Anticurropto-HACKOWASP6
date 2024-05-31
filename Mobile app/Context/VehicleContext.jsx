import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import {
  vehiclecontractABI,
  vehiclecontractAddress,
} from "../Utils/ethers/constants";

export const VehicleContext = React.createContext();

const { ethereum } = window;

const getContractInstance = async () => {
  if (!ethereum) throw new Error("Ethereum is not present");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const vehicleContract = new ethers.Contract(
    vehiclecontractAddress,
    vehiclecontractABI,
    signer
  );

  return vehicleContract;
};

const VehicleProvider = ({ children }) => {
  const [formData, setformData] = useState({
    vehicleId: "",
    phoneNum: "",
    buyDate: "",
    model: "",
    plateNum: "",
    insuranceValidity: "",
    pollutionValidity: "",
  });
  
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleCount, setVehicleCount] = useState(
    localStorage.getItem("vehicleCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getUserVehiclesfunc = async (tempAddress, vehicleContract) => {
    console.log("in checkIfWalletIsConnect Connected:", tempAddress);
    try {
      const availableVehicles = await vehicleContract.getUserVehicles(tempAddress);
      console.log("available vehicles : ", availableVehicles);

      const structuredTransactions = availableVehicles.map((transaction) => ({
        vehicleId: transaction.vehicleId,
        phoneNum: transaction.phoneNum,
        buyDate: transaction.buyDate,
        model: transaction.model,
        plateNum: transaction.plateNum,
        insuranceValidity: transaction.insuranceValidity,
        pollutionValidity: transaction.pollutionValidity,
      }));

      console.log(structuredTransactions);
      console.log("In get All Transaction");
      setTransactions(structuredTransactions);
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
        const vehicleContract = await getContractInstance();
        getUserVehiclesfunc(accounts[0], vehicleContract);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfVehiclesExists = async () => {
    try {
      const vehicleContract = await getContractInstance();
      console.log(vehicleContract);
      console.log("In Check Transaction");
      const currentvehicleCount = await vehicleContract.getVehicleCount();

      window.localStorage.setItem("vehicleCount", currentvehicleCount);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const addVehicleToBlockchain = async (formData) => {
    try {
      const vehicleContract = await getContractInstance();
      const {
        vehicleId,
        phoneNum,
        buyDate,
        model,
        plateNum,
        insuranceValidity,
        pollutionValidity,
      } = formData;

      console.log(vehicleContract);

      const transactionHash = await vehicleContract.addVehicle(
        vehicleId,
        phoneNum,
        buyDate,
        model,
        plateNum,
        insuranceValidity,
        pollutionValidity
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, [vehicleCount]);

  return (
    <VehicleContext.Provider
      value={{
        currentAccount,
        vehicleCount,
        transactions,
        isLoading,
        addVehicleToBlockchain,
        handleChange,
        formData,
        checkIfWalletIsConnect,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
export default VehicleProvider;

const transferLandfunc = async (formData) => {
    if (true) {
      if (window.ethereum) {
        const { landId, newOwnerAddress, transferAmount } = formData;

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
              to: newOwnerAddress,
              gas: "0x5208",
              value: parsedAmount.toString(16),
            },
          ],
        });
        console.log("parsedAmount : ", parsedAmount);

        const transactionHash = await landContract.transferLand(
          landId,
          newOwnerAddress,
          transferAmount
        );
        console.log("Error aya error");
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
// ---------------------------------------------------------------------------------------------------------------------------------------



// const transferLandfunc = async (formData) => {
//   if (true) {
//     if (window.ethereum) {
//       const { landId, newOwnerAddress, transferAmount } = formData;

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const landContract = new ethers.Contract(landAddress, landABI, signer);
//       const exchangeRate = "50735.67";

//       const parsedAmount = ethers.parseEther(transferAmount);

//       await ethereum.request({
//         method: "eth_sendTransaction",
//         params: [
//           {
//             from: currentAccount,
//             to: newOwnerAddress,
//             gas: "0x5208",
//             value: parsedAmount.toString(16),
//           },
//         ],
//       });
//       console.log("parsedAmount : ", parsedAmount);

//       const transactionHash = await landContract.transferLand(
//         landId,
//         newOwnerAddress,
//         transferAmount
//       );
//       console.log("Error aya error");
//       setIsLoading(true);
//       console.log(`Loading - ${transactionHash.hash}`);
//       await transactionHash.wait();
//       console.log(`Success - ${transactionHash.hash}`);
//       setIsLoading(false);
//     } else {
//       console.log("No ethereum object");
//     }
//   }
//   // catch (error) {
//   //   console.log(error);
//   //   throw new Error("Error transferring land");
//   // }
// };
