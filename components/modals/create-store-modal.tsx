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
  Spinner,
  Center,
} from "@chakra-ui/react";

import { createStore } from "../../utils";
import { useAccount, useNetwork } from "wagmi";

export const CreateStoreModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [companyName, setCompanyName] = useState("");
  const [subId, setSubId] = useState("");
  const [interval, setInterval] = useState("");
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const networkId = chain?.id;

  return (
    <>
      <Button onClick={onOpen}>Create Store</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Store</ModalHeader>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Company Name</FormLabel>
                <Input
                  placeholder="Company Name"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Functions Subscription ID</FormLabel>
                <Input
                  placeholder="Functions Subscription ID"
                  onChange={(e) => setSubId(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>How Often to Check Tracking Information</FormLabel>
                <Input
                  placeholder="seconds"
                  onChange={(e) => setInterval(e.target.value)}
                />
              </FormControl>
            </ModalBody>
          )}
          <ModalCloseButton />

          <ModalFooter>
            <Button
              variant="blue"
              onClick={async () => {
                await createStore(
                  address as string,
                  companyName,
                  parseInt(subId),
                  parseInt(interval),
                  networkId as number,
                  setLoading
                );
                onClose();
                location.reload();
              }}
            >
              Create Store
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
