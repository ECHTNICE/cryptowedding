import Web3 from "web3";

import weddings from "../contracts/Weddings.json";
import testNft from "../contracts/TestNFT.json";
import getProvider from "./getProvider";

export async function getWeb3() {
  const provider = (window as any).ethereum;
  return new Web3(provider as any);
}

export function getTestNftContractAddress() {
  return (testNft.networks as any)["8545"].address;
}

export async function getTestNftContract3() {
  const web3 = await getWeb3();
  console.log(testNft.abi);
  return new web3.eth.Contract(testNft.abi as any, getTestNftContractAddress());
}

export function getWeddingsContractAddress() {
  return (weddings.networks as any)["8545"].address;
}

export async function getWeddingsContract3() {
  const web3 = await getWeb3();
  return new web3.eth.Contract(
    weddings.abi as any,
    getWeddingsContractAddress()
  );
}
