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
} from "@chakra-ui/react";

export const CardGrid: FC = () => {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <Card>
        <CardHeader>
          <Heading size="md">Orders</Heading>
        </CardHeader>
        <CardBody>
          <Text>View a summary of all your order.</Text>
        </CardBody>
        <CardFooter>
          <Link href="/orders">
            <Button>View</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Heading size="md">Vault</Heading>
        </CardHeader>
        <CardBody>
          <Text>Manage available funds and check interest earned.</Text>
        </CardBody>
        <CardFooter>
          <Link href="/vault">
            <Button>View</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Heading size="md">Settings</Heading>
        </CardHeader>
        <CardBody>
          <Text>Update Settings for your store.</Text>
        </CardBody>
        <CardFooter>
          <Link href="/settings">
            <Button>View</Button>
          </Link>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
};
