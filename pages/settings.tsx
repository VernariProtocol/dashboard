import { FC, useState, useEffect } from "react";
import { Layout } from "../components/layout";
import { NextPage } from "next";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Card } from "../components/settings/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  Container,
  Spacer,
} from "@chakra-ui/react";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import { addresses, toEth } from "../utils";
import { BigNumber } from "ethers";

interface SubIdRes {
  _hex: string;
  _isBigNumber: boolean;
}

interface FuncSub {
  balance: SubIdRes;
  consumers: string[];
  owner: string;
}

const Settings: NextPage = () => {
  const STORE_ABI = require("../contracts/Store.json");
  const FACTORY_ABI = require("../contracts/Factory.json");
  const FUNCTIONS_ABI = require("../contracts/Functions.json");

  const [storeAddress, setStoreAddress] = useState("");
  const [subId, setSubId] = useState("");
  const [subAmount, setSubAmount] = useState("0");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const networkId = (chain?.id as number) || 80001;
  const { data: proxy } = useContractRead({
    address: addresses[networkId].factory as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: "instances",
    args: [address],
  });
  const { data: _subID } = useContractRead({
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
    functionName: "getSubscriptionId",
    onSuccess: (data: SubIdRes) => {
      setSubId(data?._hex);
    },
  });

  const { data: _subAmount } = useContractRead({
    address: addresses[networkId].functions as `0x${string}`,
    abi: FUNCTIONS_ABI,
    functionName: "getSubscription",
    args: [subId],
    onSuccess: (data: FuncSub) => {
      const bigNumber = BigNumber.from(data.balance._hex);
      const stringWith3DecimalPlaces = toEth(bigNumber);

      setSubAmount(stringWith3DecimalPlaces);
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle

    if (!proxy) return;
    setStoreAddress(proxy.proxy as string);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

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
          <BreadcrumbLink href="/vault">Settings</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider />
      <Container maxW={"5xl"}>
        <Flex justifyContent={"space-around"}>
          <Card name="Chainlink Automation" amount={subAmount} />
          <Card name="Chainlink Functions" amount={subAmount} />
        </Flex>
      </Container>
    </Layout>
  );
};
export default Settings;
