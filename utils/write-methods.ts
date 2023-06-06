import { prepareWriteContract, writeContract } from "@wagmi/core";
import { addresses } from "./utils";
import { ethers } from "ethers";

const STORE_ABI = require("../contracts/Store.json");
const FACTORY_ABI = require("../contracts/Factory.json");
const VAULT_ABI = require("../contracts/Vault.json");
const TOKEN_ABI = require("../contracts/ERC677.json");

export const topUpFunctionsSub = async (
  subId: any,
  amount: string,
  networkId: number,
  loadingCallback: (isLoading: boolean) => void,
  progressCallback: (progress: number) => void,
  isOpenCallback: () => void
) => {
  try {
    const encodedFunctionsParams = ethers.utils.defaultAbiCoder.encode(
      ["uint64"],
      [subId]
    );
    const paramsConfig = {
      address: addresses[networkId].link as `0x${string}`,
      abi: TOKEN_ABI,
      functionName: "transferAndCall",
      args: [
        addresses[networkId].functions,
        ethers.utils.parseEther(amount),
        encodedFunctionsParams,
      ],
    };
    const config = await prepareWriteContract(paramsConfig);
    const data = await writeContract(config);
    isOpenCallback();
    loadingCallback(true);
    progressCallback(30);
    const isSuccess = await data.wait().then((receipt) => receipt.status === 1);
    if (!isSuccess) throw new Error("Transaction failed");
    progressCallback(80);
    await sleep(2000);
    loadingCallback(false);
  } catch (error: any) {
    throw new Error(`Error locking tokens: ${error.message}`);
  }
};

export const topUpAutomation = async (
  subId: any,
  amount: string,
  networkId: number,
  loadingCallback: (isLoading: boolean) => void,
  progressCallback: (progress: number) => void,
  isOpenCallback: () => void
) => {
  try {
    const encodedFunctionsParams = ethers.utils.defaultAbiCoder.encode(
      ["uint256"],
      [subId]
    );
    const paramsConfig = {
      address: addresses[networkId].link as `0x${string}`,
      abi: TOKEN_ABI,
      functionName: "transferAndCall",
      args: [
        addresses[networkId].keeperRegistry,
        ethers.utils.parseEther(amount),
        encodedFunctionsParams,
      ],
    };
    const config = await prepareWriteContract(paramsConfig);
    const data = await writeContract(config);
    isOpenCallback();
    loadingCallback(true);
    progressCallback(30);
    const isSuccess = await data.wait().then((receipt) => receipt.status === 1);
    if (!isSuccess) throw new Error("Transaction failed");
    progressCallback(80);
    await sleep(2000);
    loadingCallback(false);
  } catch (error: any) {
    throw new Error(`Error locking tokens: ${error.message}`);
  }
};

export async function setUpkeepId(address: string, id: string) {
  try {
    const paramsConfig = {
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "setUpkeepId",
      args: [id],
    };
    const config = await prepareWriteContract(paramsConfig);
    const data = await writeContract(config);

    const isSuccess = await data.wait().then((receipt) => receipt.status === 1);
    if (!isSuccess) throw new Error("Transaction failed");
  } catch (error: any) {
    throw new Error(`Error setting upkeepId: ${error.message}`);
  }
}

export async function updatOrder(
  address: string,
  id: string,
  shippingCompany: string,
  tracking: string
) {
  try {
    console.log(address, id, shippingCompany, tracking);
    const paramsConfig = {
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "updateOrder",
      args: [id, tracking, shippingCompany],
    };
    const config = await prepareWriteContract(paramsConfig);
    const data = await writeContract(config);

    const isSuccess = await data.wait().then((receipt) => receipt.status === 1);
    if (!isSuccess) throw new Error("Transaction failed");
  } catch (error: any) {
    throw new Error(`Error updating ordre: ${error.message}`);
  }
}

export async function withdrawGasTokenFromVault(
  address: string,
  amount: string
) {
  try {
    const paramsConfig = {
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "withdrawVaultGasToken",
      args: [ethers.utils.parseEther(amount)],
    };
    const config = await prepareWriteContract(paramsConfig);
    const data = await writeContract(config);

    const isSuccess = await data.wait().then((receipt) => receipt.status === 1);
    if (!isSuccess) throw new Error("Transaction failed");
  } catch (error: any) {
    throw new Error(`Error withdrawing gas tokens: ${error.message}`);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
