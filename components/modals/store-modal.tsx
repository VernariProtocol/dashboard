import { FC, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useAccount,
  useProvider,
} from "wagmi";

interface StoreModalProps {
  id: string;
  storeAddress: string;
}

export const StoreModal: FC<StoreModalProps> = ({ id, storeAddress }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shippingCompany, setShippingCompany] = useState("");
  const [tracking, setTracking] = useState("");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const networkId = (chain?.id as number) || 80001;
  const provider = useProvider();
  const STORE_ABI = require("../../contracts/Store.json");

  const { config } = usePrepareContractWrite({
    address: storeAddress as `0x${string}`,
    abi: STORE_ABI,
    functionName: "updateOrder",
    args: [id, shippingCompany, tracking],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleUpdate = async () => {};

  return (
    <>
      <Button onClick={onOpen}>Update</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Shipping Company</FormLabel>
              <Input
                placeholder="Shipping Company"
                onChange={(e) => setShippingCompany(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Tracking Number</FormLabel>
              <Input
                placeholder="Tracking Number"
                onChange={(e) => setTracking(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="blue"
              onClick={() => {
                console.log(shippingCompany);
                write?.();
                handleUpdate();
                onClose();
              }}
            >
              Update
            </Button>
            <Button colorScheme="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
