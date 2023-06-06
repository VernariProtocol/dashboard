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
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import {
  getLockedGasTokenAmount,
  getStore,
  getWithdrawableGasTokenAmount,
  getYield,
} from "../utils";
import { BigNumber } from "ethers";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Vault: NextPage = () => {
  const [storeAddress, setStoreAddress] = useState("");
  const [networkId, setNetworkId] = useState(1);
  const [withdrawGasTokenAmount, setWithdrawGasTokenAmount] = useState("0");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lockedGasTokenAmount, setLockedGasTokenAmount] = useState("0");
  const [yieldAmount, setYieldAmount] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const { address } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _store: any = await getStore(address as string);
        const _gasTokenAmount: any = await getWithdrawableGasTokenAmount(
          _store as string
        );
        const _lockedGasTokenAmount: any = await getLockedGasTokenAmount(
          _store as string
        );
        // const _yieldAmount: any = await getYield(_store);

        setStoreAddress(_store);
        setWithdrawGasTokenAmount(_gasTokenAmount);
        setLockedGasTokenAmount(_lockedGasTokenAmount);
        // setYieldAmount(_yieldAmount);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [address]);

  useEffect(() => {
    if (error != null) {
      toast({
        title: "Error.",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    setError(null);
  }, [error, toast]);

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
      {isLoading ? (
        <Center marginTop={"20"} paddingBottom={"200"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="blue.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <Stats
          networkId={networkId}
          withdrawGasToken={withdrawGasTokenAmount}
          lockedGasToken={lockedGasTokenAmount}
          yieldAmount={yieldAmount}
          storeAddress={storeAddress}
        />
      )}
    </Layout>
  );
};
export default Vault;
