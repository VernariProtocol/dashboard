import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  IconProps,
  Image,
} from "@chakra-ui/react";
import { ConnectButton } from "../connect-button";
import { FC } from "react";
import { CreateStoreModal } from "../modals/create-store-modal";

interface HeroProps {
  createStore: boolean;
}

export const Hero: FC<HeroProps> = ({ createStore }) => {
  return (
    <Container maxW={"5xl"}>
      <Flex justifyContent={"center"}>
        <Illustration
          height={{ sm: "24rem", lg: "28rem" }}
          mt={{ base: 12, sm: 16 }}
        />
      </Flex>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        marginTop={"-120"}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color={"#216d8f"}
        >
          Web3 E-Commerce{" "}
          <Text as={"span"} color={"#e99862"} fontFamily={"Norse"}>
            made secure
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Secure and easy to use e-commerce payment platform built on the
          blockchain.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <ConnectButton>Connect Wallet</ConnectButton>
          {!createStore ? (
            <Button rounded={"full"} px={6}>
              Learn more
            </Button>
          ) : (
            <CreateStoreModal>Create Store</CreateStoreModal>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export const Illustration = (props: IconProps) => {
  return (
    <Box boxSize="lg">
      <Image src="/images/logo-bg.png" alt="Vernari" />
    </Box>
  );
};
