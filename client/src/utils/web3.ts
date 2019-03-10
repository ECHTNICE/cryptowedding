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

export async function getWedding(weddingId: string) {
  const weddingContract = await getWeddingsContract3();

  const wedding = await weddingContract.methods.weddings(weddingId).call();

  console.log("Wedding", wedding);
  return wedding;
}

export async function getWeddingGuests(wedding: any) {
  const weddingContract = await getWeddingsContract3();

  const guestPromises = [];
  for (let i = 0; i < wedding.guestCount; i++) {
    guestPromises.push(
      weddingContract.methods.weddingGuests(wedding.id, i).call()
    );
  }
  const guests = await Promise.all(guestPromises);

  console.log("Wedding guests", guests);
  return guests;
}

export async function getNftTokenIdsOfAccount() {
  const web3 = await getWeb3();
  const nft = await getTestNftContract3();

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const balance = await nft.methods.balanceOf(account).call();

  const tokenIdPromises = [];
  for (let i = 0; i < balance; i++) {
    tokenIdPromises.push(nft.methods.tokenOfOwnerByIndex(account, i).call());
  }
  const tokenIds = await Promise.all(tokenIdPromises);

  return tokenIds;
}
