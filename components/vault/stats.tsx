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
import { gasTokens, withdrawGasTokenFromVault } from "../../utils";
import { VaultCard } from "./card";

interface StatProps {
  networkId: number;
  withdrawGasToken: string;
  lockedGasToken: string;
  yieldAmount: string;
  storeAddress: string;
}

export const Stats: FC<StatProps> = ({
  networkId,
  withdrawGasToken,
  lockedGasToken,
  yieldAmount,
  storeAddress,
}) => {
  const gasToken = gasTokens[networkId];
  return (
    <Container maxW={"5xl"} paddingBottom={"100"}>
      <Flex>
        <VaultCard
          name="Total Locked"
          gasToken={gasToken}
          total={lockedGasToken}
          buttonAction=""
          action={async () => {}}
        />
        <Spacer />
        <VaultCard
          name="Total Withdrawable"
          gasToken={gasToken}
          total={withdrawGasToken}
          buttonAction="Withdraw"
          action={withdrawGasTokenFromVault}
          storeAddress={storeAddress}
        />
        <Spacer />
        <VaultCard
          name="Total Yield Earned"
          gasToken={gasToken}
          total={yieldAmount}
          buttonAction=""
          action={async () => {}}
        />
      </Flex>
    </Container>
  );
};
