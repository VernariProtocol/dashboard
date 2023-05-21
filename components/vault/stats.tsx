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
import { gasTokens } from "../../utils";
import { VaultCard } from "./card";

interface StatProps {
  networkId: number;
  withdrawGasToken: string;
  lockedGasToken: string;
  yieldAmount: string;
}

export const Stats: FC<StatProps> = ({
  networkId,
  withdrawGasToken,
  lockedGasToken,
  yieldAmount,
}) => {
  const gasToken = gasTokens[networkId];
  return (
    <Container maxW={"5xl"}>
      <Flex>
        <VaultCard
          name="Total Locked"
          gasToken={gasToken}
          total={lockedGasToken}
          buttonAction=""
        />
        <Spacer />
        <VaultCard
          name="Total Withdrawable"
          gasToken={gasToken}
          total={withdrawGasToken}
          buttonAction="Withdraw"
        />
        <Spacer />
        <VaultCard
          name="Total Yield Earned"
          gasToken={gasToken}
          total={yieldAmount}
          buttonAction=""
        />
      </Flex>
    </Container>
  );
};
