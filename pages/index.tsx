import react, { useEffect } from "react";
import { useConnect } from "wagmi";
import { useIsMounted } from "../hooks/app-hooks";
import { Layout } from "../components/layout";

export default function Home() {
  return (
    <Layout title="Vernari Protocol">
      <h1>Home</h1>
    </Layout>
  );
}
