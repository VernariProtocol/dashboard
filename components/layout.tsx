import { NavBar } from "./navbar";
import { Footer } from "./footer";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Flex,
  IconButton,
  Spacer,
} from "@chakra-ui/react";

import Head from "next/head";
import { FC, ReactNode, useState, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  canToggleHeader?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  children,
  canToggleHeader = false,
  title = "Vernari Protocol",
}) => {
  const [toggleHeader, setToggleHeader] = useState(true);

  const layoutPaddingX = ["0.75rem", "1rem", "2rem", "5rem"];
  const [width, setWidth] = useState(900);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }, []);

  return (
    <>
      <NavBar width={width} paddingX={layoutPaddingX} />

      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container maxWidth="full" background="#1a2035">
        <Flex
          py={4}
          justifyContent="flex-end"
          alignItems="center"
          height={toggleHeader ? undefined : "30px"}
        >
          <Spacer />
          <IconButton
            size="sm"
            variant="ghost"
            icon={toggleHeader ? <ArrowUpIcon /> : <ArrowDownIcon />}
            hidden={!canToggleHeader}
            aria-label="toggle header"
            onClick={() => setToggleHeader(!toggleHeader)}
          />
          <Spacer />
          <Center hidden={!toggleHeader} />
        </Flex>
        {children}
      </Container>
      <Footer />
    </>
  );
};
