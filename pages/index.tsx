import react, { useEffect } from "react";
import { useConnect } from "wagmi";
import { useIsMounted } from "../hooks/app-hooks";
import { Layout } from "../components/layout";
import { StoreOrders } from "@/components/store-orders";
import { CardGrid } from "@/components/card-grid";
import { Stats } from "@/components/stats";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSwitchNetwork,
  useNetwork,
} from "wagmi";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
  Box,
  Container,
} from "@chakra-ui/react";

export default function Home() {
  const { address } = useAccount();
  const isMounted = useIsMounted();

  return (
    <Layout title="Vernari Protocol">
      {isMounted() && address ? (
        <>
          <Stats />
          <CardGrid />
        </>
      ) : (
        <div>Not connected</div>
      )}
    </Layout>
  );
}
