import react, { useEffect } from "react";
import { useConnect } from "wagmi";
import { useIsMounted } from "../hooks/app-hooks";
import { Layout } from "../components/layout";
import { StoreOrders } from "@/components/store-orders";
import { CardGrid } from "@/components/card-grid";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSwitchNetwork,
  useNetwork,
} from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const isMounted = useIsMounted();

  return (
    <Layout title="Vernari Protocol">
      {isMounted() && address ? (
        <>
          <CardGrid />
        </>
      ) : (
        <div>Not connected</div>
      )}
    </Layout>
  );
}
