// import { Logo } from '../img/logo';
// import { ColorModeSwitcher } from "./color-mode-switcher";
// import { MobileMenu } from "./mobile-menu";
import { StandardMenu } from "./standard-menu";
import { Wallet } from "./wallet";
import { Flex, Link, Heading } from "@chakra-ui/react";
import { FC } from "react";

interface NavBarProps {
  width: number;
  paddingX?: string[];
}

export const NavBar: FC<NavBarProps> = ({ width, paddingX }) => {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      height={["8vh", "10vh", "12vh"]}
      bg="white"
      boxShadow="Dark lg"
      padding={"15px"}
    >
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Heading color="black" size="lg" letterSpacing={2}>
          <Link style={{ textDecoration: "none" }} href="/">
            Vernari Protocol
          </Link>
        </Heading>
        <Wallet width={width} />
      </Flex>
      {<StandardMenu width={width} />}
    </Flex>
  );
};
