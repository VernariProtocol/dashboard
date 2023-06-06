import { readContract, prepareWriteContract, writeContract } from "@wagmi/core";
import { addresses, toEth } from "./utils";
import { formatEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";

const STORE_ABI = require("../contracts/Store.json");
const FACTORY_ABI = require("../contracts/Factory.json");
const FUNCTIONS_ABI = require("../contracts/Functions.json");
const VAULT_ABI = require("../contracts/Vault.json");

export const getSubscriptionId = async (address: string) => {
  try {
    const data = await readContract({
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "getSubscriptionId",
      args: [],
    });
    return parseInt(data?._hex as string, 16);
  } catch (error: any) {
    throw new Error(`Error getting subscription id: ${error.message}`);
  }
};

export const getCompanyName = async (address: string) => {
  try {
    const data = await readContract({
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "getCompanyName",
      args: [],
    });
    return data;
  } catch (error: any) {
    throw new Error(`Error getting subscription id: ${error.message}`);
  }
};

export const getStore = async (address: string) => {
  const contract = addresses[80001].factory;
  try {
    const data = await readContract({
      address: contract as `0x${string}`,
      abi: FACTORY_ABI,
      functionName: "instances",
      args: [address],
    });
    return data?.proxy;
  } catch (error: any) {
    throw new Error(`Error getting store address: ${error.message}`);
  }
};

export const getFunctionsBalance = async (subId: number) => {
  const contract = addresses[80001].functions;
  try {
    const data: any = await readContract({
      address: contract as `0x${string}`,
      abi: FUNCTIONS_ABI,
      functionName: "getSubscription",
      args: [subId],
    });
    const bigNumber = BigNumber.from(data.balance?._hex);
    const stringWith3DecimalPlaces = toEth(bigNumber);
    return stringWith3DecimalPlaces;
  } catch (error: any) {
    throw new Error(`Error getting functions balance: ${error.message}`);
  }
};

export const getAutomationBalance = async (address: string) => {
  try {
    const data = await readContract({
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "automationBalance",
      args: [],
    });
    const bigNumber = BigNumber.from(data?._hex);
    const stringWith3DecimalPlaces = toEth(bigNumber);
    return stringWith3DecimalPlaces;
  } catch (error: any) {
    throw new Error(`Error getting store orders: ${error.message}`);
  }
};

export const getStoreOrders = async (address: string) => {
  try {
    const data = await readContract({
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "getOrders",
      args: [],
    });
    return data.length;
  } catch (error: any) {
    throw new Error(`Error getting store orders: ${error.message}`);
  }
};

export const getWithdrawableGasTokenAmount = async (address: string) => {
  try {
    const data = await readContract({
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "getWithdrawableGasTokenAmount",
      args: [],
    });
    console.log(data);
    return toEth(BigNumber.from(data._hex));
  } catch (error: any) {
    throw new Error(`Error getting gas token amount69: ${error.message}`);
  }
};

export const getLockedGasTokenAmount = async (address: string) => {
  try {
    const data = await readContract({
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "getLockedGasTokenAmount",
      args: [],
    });
    console.log("data", data);
    return toEth(BigNumber.from(data._hex));
  } catch (error: any) {
    throw new Error(`Error getting lockd gas token amount: ${error.message}`);
  }
};

export const getYield = async (address: string) => {
  const contract = addresses[80001].vault;
  const weth = addresses[80001].weth;
  try {
    const data = await readContract({
      address: contract as `0x${string}`,
      abi: VAULT_ABI,
      functionName: "getYield",
      args: [address, weth],
    });
    console.log(data);
    return toEth(BigNumber.from(data._hex));
  } catch (error: any) {
    throw new Error(`Error getting yield: ${error.message}`);
  }
};

export const getKeeperId = async (address: string) => {
  try {
    const data = await readContract({
      address: address as `0x${string}`,
      abi: STORE_ABI,
      functionName: "getUpkeepId",
      args: [],
    });
    console.log("data", data);
    return BigNumber.from(data._hex).toString();
  } catch (error: any) {
    throw new Error(`Error getting upkepId: ${error.message}`);
  }
};
