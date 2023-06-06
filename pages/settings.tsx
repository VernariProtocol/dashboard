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
  Center,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import {
  addresses,
  toEth,
  getSubscriptionId,
  topUpFunctionsSub,
  getStore,
  getFunctionsBalance,
  getAutomationBalance,
  setUpkeepId,
  topUpAutomation,
  getKeeperId,
} from "../utils";

const Settings: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [storeAddress, setStoreAddress] = useState("");
  const [subId, setSubId] = useState<number | null>(null);
  const [subAmount, setSubAmount] = useState("0");
  const [automationAmount, setAutomationAmount] = useState("0");
  const [upkeepId, setUpkeepId] = useState("");
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _store: any = await getStore(address as string);
        const _subId = await getSubscriptionId(_store as string);
        const _functionsBalance: any = await getFunctionsBalance(_subId);
        const _automationBalance: any = await getAutomationBalance(_store);
        const _upkeepId: any = await getKeeperId(_store);

        setSubId(_subId);
        setStoreAddress(_store);
        setSubAmount(_functionsBalance);
        setAutomationAmount(_automationBalance);
        setUpkeepId(_upkeepId);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error as string);
      }
    };

    fetchData();
  }, [address, isLoading]);

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
      {isLoading ? (
        <Center marginTop={"200"} paddingBottom={"400"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="blue.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <Container maxW={"5xl"} paddingBottom={"50"}>
          <Flex justifyContent={"space-around"}>
            <Card
              name="Chainlink Automation"
              amount={automationAmount}
              topUp={topUpAutomation}
              id={upkeepId}
            />
            <Card
              name="Chainlink Functions"
              amount={subAmount}
              topUp={topUpFunctionsSub}
              id={subId}
            />
            {/* <Button
              colorScheme="blue"
              size="lg"
              onClick={() =>
                setUpkeepId(
                  storeAddress,
                  "39070414387044141486770063056927038555818477189234883779857466978512989151390"
                )
              }
            /> */}
          </Flex>
        </Container>
      )}
    </Layout>
  );
};
export default Settings;
