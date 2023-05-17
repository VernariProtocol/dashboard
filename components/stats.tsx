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

export const Stats: FC = () => {
  return (
    <Container maxW={"5xl"}>
      <Flex>
        <Stat>
          <StatLabel>Total Orders</StatLabel>
          <StatNumber>3</StatNumber>
          {/* <StatHelpText>Feb 12 - Feb 28</StatHelpText> */}
        </Stat>
        <Spacer />
        <Stat>
          <StatLabel>Automation Balance</StatLabel>
          <StatNumber>3</StatNumber>
          <StatHelpText>LINK</StatHelpText>
        </Stat>
        <Spacer />
        <Stat>
          <StatLabel>Function Balance</StatLabel>
          <StatNumber>3</StatNumber>
          <StatHelpText>LINK</StatHelpText>
        </Stat>
      </Flex>
    </Container>
  );
};
