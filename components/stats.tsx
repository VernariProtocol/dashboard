import { FC } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
  Box,
  Container,
  Spacer,
} from "@chakra-ui/react";

interface StatProps {
  orders: number;
  autoBalance: string;
  funcBalance: string;
}

export const Stats: FC<StatProps> = ({ orders, autoBalance, funcBalance }) => {
  return (
    <Container maxW={"5xl"}>
      <Flex>
        <Stat>
          <StatLabel>Open Orders</StatLabel>
          <StatNumber>{orders}</StatNumber>
          {/* <StatHelpText>Feb 12 - Feb 28</StatHelpText> */}
        </Stat>
        <Spacer />
        <Stat>
          <StatLabel>Automation Balance</StatLabel>
          <StatNumber>{autoBalance}</StatNumber>
          <StatHelpText>LINK</StatHelpText>
        </Stat>
        <Spacer />
        <Stat>
          <StatLabel>Function Balance</StatLabel>
          <StatNumber>{funcBalance}</StatNumber>
          <StatHelpText>LINK</StatHelpText>
        </Stat>
      </Flex>
    </Container>
  );
};
