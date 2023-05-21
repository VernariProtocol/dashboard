import { FC, useEffect, useState } from "react";
import { addresses } from "../utils";
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
  useToast,
} from "@chakra-ui/react";
import {
  useContractRead,
  useNetwork,
  useAccount,
  useContractEvent,
} from "wagmi";
import { IStore } from "../contracts/types/Store";
import { toEth } from "../utils";
import { StoreModal } from "./modals/store-modal";

enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
  RETURNED,
  CANCELLED,
}

export const StoreOrders: FC = () => {
  const [orders, setOrders] = useState<IStore.OrderStructOutput[]>([]);
  const [orderUpdated, setOrderUpdated] = useState(false);
  const [storeAddress, setStoreAddress] = useState("");
  const STORE_ABI = require("../contracts/Store.json");
  const FACTORY_ABI = require("../contracts/Factory.json");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const networkId = (chain?.id as number) || 80001;
  const toast = useToast();
  const { data: proxy } = useContractRead({
    address: addresses[networkId].factory as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: "instances",
    args: [address],
  });
  const { data: _orders } = useContractRead({
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
    functionName: "getOrders",
    onSuccess: (data: []) => {
      console.log("orders", data);
      setOrders(data);
    },
  });

  useContractEvent({
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
    eventName: "OrderUpdated",
    listener(log) {
      const orderIndex = orders.findIndex((order) => order.Id === log);

      if (orderIndex !== -1) {
        let updatedOrder = { ...orders[orderIndex] };
        updatedOrder.status = OrderStatus.SHIPPED;

        let updatedOrders = [...orders];
        updatedOrders[orderIndex] = updatedOrder;
        setOrders(updatedOrders);
        setOrderUpdated(true);
      }
    },
  });

  useEffect(() => {
    if (orderUpdated) {
      toast({
        title: "Order Updated.",
        description: "Your order status been updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    setOrderUpdated(false);
  }, [orderUpdated, toast]);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle

    if (!proxy) return;
    setStoreAddress(proxy.proxy as string);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  console.log(storeAddress);
  return (
    <Container maxW={"5xl"} paddingBottom={300} paddingTop={10}>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Orders</TableCaption>

          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, id) => {
              return (
                <Tr key={id}>
                  <Td>{order.Id}</Td>
                  <Td>{toEth(order.value)}</Td>
                  <Td>{OrderStatus[order.status]}</Td>
                  <Td>
                    <StoreModal id={order.Id} storeAddress={storeAddress} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Container>
  );
};
