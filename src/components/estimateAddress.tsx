import { ethers, BigNumber } from "ethers";
import LouiceFactory from "../abi/LouiceFactory.json";
import { HexString } from "web3";

import {tokens} from '../token/tokens';
import {SECP256R1_VERIFIER, SALT} from "./chainInfo"
type TokenKey = keyof typeof tokens;

export const getEstimateAddress = async (web3:any, rawId: any, publicKeys:any[]): Promise<any> => {
    const LOUICE_FACTORY = "0x0cA86987e13568500BCC4238a9d6F8988BAF6A86";
    const LouiceFactoryIn = new web3.eth.Contract(LouiceFactory.abi, LOUICE_FACTORY);
    
    const prefix = "0x04";
    const publicKey = prefix +publicKeys[0].slice(2) + publicKeys[1].slice(2);
    
    const address = LouiceFactoryIn.methods.getAddress(
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

export const fetchERC20Balance = async (web3: any,  address: HexString, chain: TokenKey): Promise<any> => {
    console.log("Fetching ERC20 balance for:", address, "on chain:", chain);
  
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
      if (chain in tokens) {
        const { address: contractAddress, decimals } = tokens[chain];
  
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
      } else {
        console.error("Chain not found in tokens object:", chain);
        return 0;
      }
    } catch (error) {
      console.error("Error fetching ERC20 balance:", error);
      return 0;
    }
  };