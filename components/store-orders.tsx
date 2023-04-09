import { FC } from "react";
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
} from "@chakra-ui/react";

export const StoreOrders: FC = () => {
  return (
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
  );
};
