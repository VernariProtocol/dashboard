// import { Logo } from '../img/logo';
// import { ColorModeSwitcher } from "./color-mode-switcher";
// import { MobileMenu } from "./mobile-menu";
import { StandardMenu } from "./standard-menu";
import { Wallet } from "./wallet";
import { Flex, Link, Heading, Box } from "@chakra-ui/react";
import { FC } from "react";

interface NavBarProps {
  width: number;
  paddingX?: string[];
}

export const NavBar: FC<NavBarProps> = ({ width, paddingX }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      height={["8vh", "10vh", "12vh"]}
      bg="white"
      boxShadow="Dark lg"
      padding={paddingX}
    >
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Heading color="black" size="lg" letterSpacing={2}>
          <Box
            as="img"
            src="/images/logo.png"
            alt="Vernari Protocol"
            width={50}
            height={50}
          />
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
