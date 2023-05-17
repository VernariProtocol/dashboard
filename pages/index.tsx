import react, { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { useIsMounted } from "../hooks/app-hooks";
import { Layout } from "../components/layout";
import { StoreOrders } from "@/components/store-orders";
import { CardGrid } from "@/components/card-grid";
import { Stats } from "@/components/stats";
import LandingPage from "@/components/landing-page";
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
  const [showLandingPage, setShowLandingPage] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setIsReady(true);
      setShowLandingPage(false);
    } else {
      setIsReady(false);
      setShowLandingPage(true);
    }
  }, [address]);

  return (
    <Layout title="Varnari Protocol">
      {isReady ? (
        <>
          <Stats />
          <CardGrid />
        </>
      ) : showLandingPage ? (
        <LandingPage />
      ) : (
        <></>
      )}
    </Layout>
  );
}
