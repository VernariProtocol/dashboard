import { BigNumber, utils } from "ethers";
export const shortenAddress = (addr: string): string =>
  `${addr.substring(0, 6)}...${addr.slice(addr.length - 4)}`;

type AddressRecord = {
  [key: number]: {
    factory: string;
    token: string;
    functions: string;
    vault: string;
    weth: string;
    link: string;
    keeperRegistry: string;
  };
};
type GasToken = {
  [key: number]: string;
};
export const addresses: AddressRecord = {
  80001: {
    factory: "0x7bC230DD4bF25fc076224387a043324527D7d29A",
    token: "0x6add4328327E6b66eA13AE64957B312fa210fCdd",
    functions: "0xEe9Bf52E5Ea228404bB54BCFbbDa8c21131b9039",
    vault: "0xe616b8682d549e2d84fEc0eFF7f3704C699c2e58",
    weth: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
    link: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    keeperRegistry: "0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2",
  },
};

export const gasTokens: GasToken = {
  80001: "MATIC",
  1: "ETH",
};

export const toEth = (wei: BigNumber): string => {
  const eth = utils.formatEther(wei);
  const number = parseFloat(eth);
  const roundedNumber = number.toFixed(3);
  const stringWith3DecimalPlaces = roundedNumber.toString();
  return stringWith3DecimalPlaces;
};
