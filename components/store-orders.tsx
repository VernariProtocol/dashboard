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
} from "@chakra-ui/react";
import { useBlockNumber, useContractRead, useNetwork, useAccount } from "wagmi";

export const StoreOrders: FC = () => {
  const [orders, setOrders] = useState([]);
  const [storeAddress, setStoreAddress] = useState("");
  const STORE_ABI = require("../contracts/Store.json");
  const FACTORY_ABI = require("../contracts/Factory.json");
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
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle

    if (!proxy) return;
    setStoreAddress(proxy.proxy as string);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  console.log(storeAddress);
  return (
    <Container maxW={"5xl"}>
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
            <Tr>
              <Td>0x...</Td>
              <Td>43.66</Td>
              <Td>PENDING</Td>
              <Td>
                <Button>Update</Button>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Container>
  );
};
