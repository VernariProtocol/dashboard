import { use, useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { NextPage } from "next";
import { Stats } from "@/components/vault/stats";
import {
  useContractRead,
  useNetwork,
  useAccount,
  useContractReads,
} from "wagmi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
} from "@chakra-ui/react";
import { addresses, toEth } from "../utils";
import { BigNumber } from "ethers";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface ethRes {
  _hex: string;
  _isBigNumber: boolean;
}

const Vault: NextPage = () => {
  const [storeAddress, setStoreAddress] = useState("");
  const [factoryAddress, setFactoryAddress] = useState("");
  const [vaultAddress, setVaultAddress] = useState("");
  const [networkId, setNetworkId] = useState(1);
  const [withdrawGasTokenAmount, setWithdrawGasTokenAmount] = useState("0");
  const [lockedasTokenAmount, setLockedGasTokenAmount] = useState("0");
  const [yieldAmount, setYieldAmount] = useState("0");
  const STORE_ABI = require("../contracts/Store.json");
  const FACTORY_ABI = require("../contracts/Factory.json");
  const VAULT_ABI = require("../contracts/Vault.json");

  const { address } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    const networkId = (chain?.id as number) || 1;
    const _factoryAddress = addresses[networkId].factory as string;
    const _vaultAddress = addresses[networkId].vault as string;
    setFactoryAddress(_factoryAddress);
    setVaultAddress(_vaultAddress);
  }, [chain]);

  useEffect(() => {
    const networkId = (chain?.id as number) || 1;
    setNetworkId(networkId);
  }, [chain]);

  const factoryContract = {
    address: factoryAddress as `0x${string}`,
    abi: FACTORY_ABI,
  };
  const storeContract = {
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
  };

  const { data: proxy } = useContractRead({
    address: factoryAddress as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: "instances",
    args: [address],
  });

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle

    if (!proxy) return;
    setStoreAddress(proxy.proxy as string);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useContractRead({
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
    functionName: "getWithdrawableGasTokenAmount",
    onSuccess: (data: ethRes) => {
      const bigNumber = BigNumber.from(data._hex);
      setWithdrawGasTokenAmount(toEth(bigNumber));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useContractRead({
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
    functionName: "getLockedGasTokenAmount",
    onSuccess: (data: ethRes) => {
      const bigNumber = BigNumber.from(data._hex);
      setLockedGasTokenAmount(toEth(bigNumber));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useContractRead({
    address: vaultAddress as `0x${string}`,
    abi: VAULT_ABI,
    functionName: "getYield",
    onSuccess: (data: ethRes) => {
      const bigNumber = BigNumber.from(data._hex);
      setYieldAmount(toEth(bigNumber));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <Layout title="Vernari Protocol">
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/vault">Vault</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider />
      <Stats
        networkId={networkId}
        withdrawGasToken={withdrawGasTokenAmount}
        lockedGasToken={lockedasTokenAmount}
        yieldAmount={yieldAmount}
      />
    </Layout>
  );
};
export default Vault;
