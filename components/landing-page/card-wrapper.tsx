import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function GridListWith() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Integrate into your existing e-commerce platform
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Vernari allows your users to have peace of mind when ordering from
          your company, and allows you to earn yield on your revenue.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"Blockchain Verified"}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              "Secure user experience with blockchain verified transactions."
            }
            href={"#"}
          />
          <Card
            heading={"Powered By Chainlink"}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              "Oracles are the bridge between the real world and the blockchain."
            }
            href={"#"}
          />
          <Card
            heading={"Earn Yield"}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={"Earn yield on your lockd revinue."}
            href={"#"}
          />
        </Flex>
      </Container>
    </Box>
  );
}
