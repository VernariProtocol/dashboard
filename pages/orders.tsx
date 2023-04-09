import { FC } from "react";
import { Layout } from "../components/layout";
import { NextPage } from "next";
import { StoreOrders } from "@/components/store-orders";
const Orders: NextPage = () => {
  return (
    <Layout title="Vernari Protocol">
      <StoreOrders />
    </Layout>
  );
};
export default Orders;
