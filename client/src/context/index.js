import React, { useContext, createContext, useState, useRef, useEffect } from 'react';

import { Contract, providers } from "ethers";
import { ethers } from 'ethers';
import {
  FAMETX_ABI,
  FAMETX_ADDRESS
} from '../constants'
import Web3Modal from "web3modal";


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // True if user has connected their wallet, false otherwise
  const [walletConnected, setWalletConnected] = useState(false);
  // connected users address
  const [address, setAddress] = useState('');
  // contract
  const [contract, setContract] = useState('');


  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner=false) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider)
      const {chainId} = await web3Provider.getNetwork();
      if(chainId !== 5) {
        alert("Please switch to the Goerli network!");
        throw new Error("Please switch to the Goerli network");
      }
      if(needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (error) {
      console.error(error)
    }
  }

  const getContractInstance = async (providerOrSigner) => {
    return new Contract(
      FAMETX_ADDRESS,
      FAMETX_ABI,
      providerOrSigner
    );
  }

  const connect = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      setWalletConnected(true);
      const add = await signer.getAddress();
      setAddress(add)
      const ctx = await getContractInstance(signer)
      setContract(ctx)
    } catch (error) {
      console.error(error);
    }
  }

  const getAllTransactions = async () => {
    try {
      const transactions = await contract.getAllTransactions()
      console.log(transactions)
      const parsedTransactions = transactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }));
      return parsedTransactions;
    } catch (error) {
      console.error(error);
      alert(error.reason)
    }
  }

  const sendCrypto = async ({ address, amount, message }) => {
    try {
      ethers.utils.getAddress(address);
      const parsedAmount = ethers.utils.parseEther(amount)
      const signer = await getProviderOrSigner(true);
      await signer.sendTransaction({
        to: address,
        value: parsedAmount
      });
      const txHash = await contract.addToBlockchain(address, parsedAmount, message);
      await txHash.wait();
    } catch (error) {
      console.error(error)
      alert(error.reason)
    }
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [walletConnected]);

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        getAllTransactions,
        sendCrypto
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);