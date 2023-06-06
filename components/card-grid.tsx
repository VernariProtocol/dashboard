import { FC } from "react";
import {
  SimpleGrid,
  Card,
  Heading,
  CardHeader,
  CardFooter,
  CardBody,
  Text,
  Button,
  Link,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";

export const CardGrid: FC = () => {
  return (
    <Center py={100}>
      <SimpleGrid spacing={10} flexWrap="wrap" display="flex">
        <Card
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <CardHeader>
            <Center>
              <Heading size="md">Orders</Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <Text>View and update orders.</Text>
          </CardBody>
          <CardFooter>
            <Link href="/orders">
              <Button
                mt={10}
                w={"full"}
                bg={"blue.400"}
                color={"white"}
                rounded={"xl"}
                boxShadow={"0 5px 20px 0px rgb(213 109 33 / 23%)"}
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                View
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <CardHeader>
            <Center>
              <Heading size="md">Vault</Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <Text>Manage available funds and check interest earned.</Text>
          </CardBody>
          <CardFooter>
            <Link href="/vault">
              <Button
                mt={10}
                w={"full"}
                bg={"blue.400"}
                color={"white"}
                rounded={"xl"}
                boxShadow={"0 5px 20px 0px rgb(213 109 33 / 23%)"}
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                View
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <CardHeader>
            <Center>
              <Heading size="md">Settings</Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <Text>Update Settings for your store.</Text>
          </CardBody>
          <CardFooter>
            <Link href="/settings">
              <Button
                mt={10}
                w={"full"}
                bg={"blue.400"}
                color={"white"}
                rounded={"xl"}
                boxShadow={"0 5px 20px 0px rgb(213 109 33 / 23%)"}
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                View
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Center>
  );
};
