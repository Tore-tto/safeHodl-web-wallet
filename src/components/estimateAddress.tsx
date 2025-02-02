import { ethers, BigNumber } from "ethers";
import SafeHodlFactory from "../abi/SafeHodlFactory.json";
import { HexString } from "web3";

import {coinList} from '../token/coinList';
import {chainIdandType,chainInfo, SECP256R1_VERIFIER, SALT, SafeHodl_FACTORY} from "./chainInfo"

export const getEstimateAddress = async (web3:any, rawId: any, publicKeys:any[]): Promise<any> => {
    const SafeHodlFactoryIn = new web3.eth.Contract(SafeHodlFactory.abi, SafeHodl_FACTORY);
    
    const prefix = "0x04";
    const publicKey = prefix +publicKeys[0].slice(2) + publicKeys[1].slice(2);
    
    const address = SafeHodlFactoryIn.methods.getAddress(
      SECP256R1_VERIFIER,
      publicKey,
      SALT).call();

    return address;
}

export const fetchBalance = async(web3:any, address:any): Promise<any> => {

    if (web3.utils.isAddress(address)) {  // Validate address
        try {
            const balance = await web3.eth.getBalance(address);
            const formattedBalance = web3.utils.fromWei(balance, "ether");
            return formattedBalance;
        } catch (error) {
            console.error("Error fetching balance:", error);
            throw error;
        }
    } else {
        console.error("Invalid address:", address);
        throw `Invalid address:", ${address}`;
    }
}

export const fetchERC20Balance = async (web3: any,  address: HexString, chainId: keyof typeof chainIdandType, tokenName: string): Promise<any> => {
    console.log("Fetching ERC20 balance for:", address, "on chain:", chainId, "Token of", tokenName);
  
    const filteredTokens = coinList[chainIdandType[chainId] as keyof typeof chainInfo];
    const token = filteredTokens.find(token => token.name === tokenName);
    if(!token){
      console.error("Chain not found in tokens object:", tokenName);
      return 0 ;
    }
  
    // ABI for the ERC20 `balanceOf` method
    const erc20ABI = [
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
      },
    ];
  
    try {
        const contractAddress = token?.address;
        const decimals  = token?.decimals;
  
        // Validate the contract address
        if (web3.utils.isAddress(contractAddress)) {
          const tokenContract = new web3.eth.Contract(erc20ABI, contractAddress);
          const balance = await tokenContract.methods.balanceOf(address).call();
          const formattedBalance = Number(balance) / 10 ** decimals;
          return formattedBalance;
        } else {
          console.error("Invalid contract address:", contractAddress);
          return 0;
        }
    } catch (error) {
      console.error("Error fetching ERC20 balance:", error);
      return 0;
    }
  };