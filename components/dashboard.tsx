import { FC, ReactNode, useState, useEffect } from "react";
import { CardGrid } from "@/components/card-grid";
import { Stats } from "@/components/stats";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import {
  addresses,
  toEth,
  getSubscriptionId,
  getCompanyName,
  getStore,
  getFunctionsBalance,
  getStoreOrders,
  getAutomationBalance,
} from "../utils";
import { Center, Spinner, Container, Heading, Divider } from "@chakra-ui/react";

export const Dashboard: FC = () => {
  const [orders, setOrders] = useState(0);
  const [company, setCompany] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subId, setSubId] = useState<number | null>(null);
  const [subAmount, setSubAmount] = useState("0");
  const [automationAmount, setAutomationAmount] = useState("0");
  const { address } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _store: any = await getStore(address as string);
        const _subId = await getSubscriptionId(_store as string);
        const _name: any = await getCompanyName(_store as string);
        const _functionsBalance: any = await getFunctionsBalance(_subId);
        const _orders: number = await getStoreOrders(_store as string);
        const _automationBalance: any = await getAutomationBalance(_store);

        setCompany(_name);
        setSubId(_subId);
        setStoreAddress(_store);
        setSubAmount(_functionsBalance);
        setOrders(_orders);
        setAutomationAmount(_automationBalance);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [address]);

  return (
    <>
      <Container maxW={"max"} paddingBottom={"100px"}>
        <Heading size="lg">{company} Dashboard</Heading>
        <Divider />
        {isLoading ? (
          <Center marginTop={"20"} paddingBottom={"10"}>
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
            orders={orders}
            autoBalance={automationAmount}
            funcBalance={subAmount}
          />
        )}
        <CardGrid />
      </Container>
    </>
  );
};
