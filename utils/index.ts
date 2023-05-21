import { BigNumber, utils } from "ethers";
export const shortenAddress = (addr: string): string =>
  `${addr.substring(0, 6)}...${addr.slice(addr.length - 4)}`;

type AddressRecord = {
  [key: number]: {
    factory: string;
    token: string;
    functions: string;
    vault: string;
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
    vault: "0x4bc7367f6A85b66CE30daD3dC2b8E548044419F1",
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
