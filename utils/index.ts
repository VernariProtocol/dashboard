export const shortenAddress = (addr: string): string =>
  `${addr.substring(0, 6)}...${addr.slice(addr.length - 4)}`;

type AddressRecord = {
  [key: number]: {
    factory: string;
    token: string;
  };
};
export const addresses: AddressRecord = {
  80001: {
    factory: "0x7bC230DD4bF25fc076224387a043324527D7d29A",
    token: "0x6add4328327E6b66eA13AE64957B312fa210fCdd",
  },
};
