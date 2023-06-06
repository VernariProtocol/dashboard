import { FC, useState } from "react";
import {
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Progress,
  Input,
} from "@chakra-ui/react";

interface CardProps {
  name: string;
  amount: string;
  topUp: (
    subId: any,
    amount: string,
    networkId: number,
    loadingCallback: (isLoading: boolean) => void,
    progressCallback: (progress: number) => void,
    isOpenCallback: () => void
  ) => Promise<void>;
  id?: any;
}

export const Card: FC<CardProps> = ({ name, amount, topUp, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(20);
  const [linkAmount, setLinkAmount] = useState("0");
  const [toolTipDisabled, setToolTipDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAmountChange = (e: any) => {
    const value = String(e.target.value);
    setLinkAmount(value);
    setToolTipDisabled(true);
    setButtonDisabled(false);
    if (!value) {
      setToolTipDisabled(false);
      setButtonDisabled(true);
    }

    // Validate input
    const regex = /^\d+(\.\d{0,18})?$/;
    const isValidAmountNow = regex.test(value);
    setIsValidAmount(isValidAmountNow);
  };
  return (
    <Center py={100}>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={useColorModeValue("blue.400", "blue.800")}
            p={2}
            px={3}
            color={"white.500"}
            rounded={"full"}
          >
            {name}
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"}>Ξ</Text>
            <Text fontSize={"6xl"} fontWeight={800}>
              {amount}
            </Text>
            <Text color={"gray.500"}>/LINK</Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <Input
            placeholder="0.0 LINK"
            isInvalid={!toolTipDisabled}
            errorBorderColor="red.300"
            onChange={handleAmountChange}
            marginBottom={5}
          />
          <Button
            onClick={() => {
              topUp(id, linkAmount, 80001, setIsLoading, setProgress, onOpen);
            }}
            isDisabled={buttonDisabled}
            mt={10}
            w={"full"}
            bg={"blue.400"}
            color={"white"}
            rounded={"xl"}
            boxShadow={"0 5px 20px 0px rgb(213 109 33 / 43%)"}
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Top up
          </Button>
        </Box>
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Topping up {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Progress value={progress} size="xs" colorScheme="blue" />
            ) : (
              <Text>LINK added!</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              size="lg"
              variant="solid"
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};
