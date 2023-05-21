import { FC, ReactNode, useState, useEffect } from "react";
import { CardGrid } from "@/components/card-grid";
import { Stats } from "@/components/stats";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import { addresses, toEth } from "../utils";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Container,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { BigNumber, utils } from "ethers";
interface SubIdRes {
  _hex: string;
  _isBigNumber: boolean;
}

interface FuncSub {
  balance: SubIdRes;
  consumers: string[];
  owner: string;
}

export const Dashboard: FC = () => {
  const [orders, setOrders] = useState(0);
  const [company, setCompany] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [subId, setSubId] = useState("");
  const [subAmount, setSubAmount] = useState("0");
  const STORE_ABI = require("../contracts/Store.json");
  const FACTORY_ABI = require("../contracts/Factory.json");
  const FUNCTIONS_ABI = require("../contracts/Functions.json");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const networkId = (chain?.id as number) || 80001;
  const { data: proxy } = useContractRead({
    address: addresses[networkId].factory as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: "instances",
    args: [address],
  });
  const { data: store } = useContractRead({
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
    functionName: "getCompanyName",
    onSuccess: (data: string) => {
      setCompany(data);
    },
  });
  const { data: _subID } = useContractRead({
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
    functionName: "getSubscriptionId",
    onSuccess: (data: SubIdRes) => {
      setSubId(data?._hex);
    },
  });
  const { data: _orders } = useContractRead({
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
    functionName: "getOrders",
    onSuccess: (data: []) => {
      setOrders(data.length);
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
    <>
      <Container maxW={"max"}>
        <Heading size="lg">{company} Dashboard</Heading>
        <Divider />
        <br />
        <Stats orders={orders} autoBalance={"1"} funcBalance={subAmount} />
        <CardGrid />
      </Container>
    </>
  );
};
