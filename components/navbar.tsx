import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { StandardMenu } from "./standard-menu";
import { Wallet } from "./wallet";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface NavBarProps {
  width: number;
  paddingX?: string[];
}

export const NavBar1: FC<NavBarProps> = ({ width, paddingX }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      height={["6vh", "8vh", "10vh"]}
      bg="white"
      boxShadow="Dark 2xl"
      padding={paddingX}
    >
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Heading color="black" size="lg" letterSpacing={2}>
          <Link style={{ textDecoration: "none" }} href="/">
            Vernari Protocol
          </Link>
        </Heading>
      </Flex>
      <Wallet />

      {<StandardMenu width={width} />}
    </Flex>
  );
};
const Links = [""];
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);
export const NavBar: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={"#ffffff"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Heading color="black" size="lg" letterSpacing={2}>
              <Link style={{ textDecoration: "none" }} href="/">
                Vernari Protocol
              </Link>
            </Heading>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Wallet />

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              ></MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
