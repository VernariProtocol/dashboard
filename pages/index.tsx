import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { Dashboard } from "../components/dashboard";
import { LandingPage } from "@/components/landing-page";
import { useAccount } from "wagmi";
import { getStore } from "../utils";
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
} from "@chakra-ui/react";

export default function Home() {
  const [showLandingPage, setShowLandingPage] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        try {
          const _store: any = await getStore(address as string);
          if (_store == "0x0000000000000000000000000000000000000000") {
            setShowLandingPage(true);
            onOpen();
            return;
          }
          setIsReady(true);
          setShowLandingPage(false);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setIsReady(false);
        setShowLandingPage(true);
      }
    };

    fetchData();
  }, [address, onOpen]);

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vernari Protocol</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            We are currently in beta. This wallet does not have a Store
            associated with it. Please create a store to get access to your
            dashboard so you can start integrating into your marketplace!
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
