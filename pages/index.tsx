import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { Dashboard } from "../components/dashboard";
import LandingPage from "@/components/landing-page";
import { useAccount } from "wagmi";

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
          <Dashboard />
        </>
      ) : showLandingPage ? (
        <LandingPage />
      ) : (
        <></>
      )}
    </Layout>
  );
}
