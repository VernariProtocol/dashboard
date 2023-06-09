import { FC, useState, ReactNode } from "react";
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

import { createStore } from "../../utils";

interface StoreModalProps {
  children: ReactNode;
}

export const CreateStoreModal: FC<StoreModalProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [companyName, setCompanyName] = useState("");
  const [subId, setSubId] = useState("");
  const [interval, setInterval] = useState("");

  return (
    <>
      <Button onClick={onOpen}>Update</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Store</ModalHeader>
          <ModalCloseButton />
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
              <FormLabel>Automation Interval</FormLabel>
              <Input
                placeholder="How Often to Check Tracking Information"
                onChange={(e) => setInterval(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="blue"
              onClick={async () => {
                await createStore(
                  "",
                  companyName,
                  parseInt(subId),
                  parseInt(interval),
                  1
                );
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
