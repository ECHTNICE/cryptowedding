import { makeContract } from "@parity/light.js";
import weddings from "../contracts/Weddings.json";
import testNft from "../contracts/TestNFT.json";

export function getTestNftContractAddress() {
  return (testNft.networks as any)["8545"].address;
}

export function getTestNftContract() {
  return makeContract(getTestNftContractAddress(), testNft.abi);
}

export function getWeddingsContractAddress() {
  return (weddings.networks as any)["8545"].address;
}

export function getWeddingsContract() {
  return makeContract(getWeddingsContractAddress(), weddings.abi);
}
