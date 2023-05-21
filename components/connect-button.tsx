import {
  Box,
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";
import { useConnect, useAccount } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { AddIcon } from "@chakra-ui/icons";

export const ConnectButton: FC<ButtonProps> = (buttonProps) => {
  const { connector: activeConnector, isConnected } = useAccount();

  const { connect, error, connectors, isLoading, pendingConnector } =
    useConnect({
      chainId: polygonMumbai.id,
    });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { children } = buttonProps;
  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        boxShadow={"0 5px 20px 0px rgb(213 109 33 / 43%)"}
        _hover={{
          bg: "blue.500",
        }}
        _focus={{
          bg: "blue.500",
        }}
        bg={"blue.400"}
        color={"white"}
        size={"sm"}
        mr={4}
        onClick={onOpen}
        {...buttonProps}
        variant="base"
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1a2035">
          <ModalHeader color="white">Connect</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {connectors &&
                connectors.map((connector) => (
                  <Button
                    variant="wallet"
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                    {isLoading &&
                      pendingConnector?.id === connector.id &&
                      " (connecting)"}
                  </Button>
                ))}
              {error && <Box>{error?.message ?? "Failed to connect"}</Box>}
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
