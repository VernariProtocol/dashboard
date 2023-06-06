import { FC } from "react";
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface CardProps {
  name: string;
  gasToken: string;
  total: string;
  buttonAction: string;
  action: (address: string, amount: string) => Promise<void>;
  storeAddress?: string;
}

export const VaultCard: FC<CardProps> = ({
  name,
  gasToken,
  total,
  buttonAction,
  action,
  storeAddress,
}) => {
  return (
    <Center py={100}>
      <Box
        maxW={"330px"}
        minW={"230px"}
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
              {total}
            </Text>
            <Text color={"gray.500"}>/{gasToken}</Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          {/* <List spacing={3}>
            {/* <ListItem>
              <ListIcon as={CheckIcon} color="green.400" />
              5.000 page views
            </ListItem> */}
          {/* </List> */}
          {buttonAction.length > 0 ? (
            <Button
              onClick={async () => {
                await action(storeAddress as string, total);
              }}
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
              {buttonAction}
            </Button>
          ) : null}
        </Box>
      </Box>
    </Center>
  );
};
