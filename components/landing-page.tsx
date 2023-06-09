import { Container } from "@chakra-ui/react";
import GridListWith from "./landing-page/card-wrapper";
import { Hero } from "./landing-page/hero";

export const LandingPage = ({}) => {
  return (
    <Container maxW={"5xl"} marginTop={"-50"}>
      <Hero createStore={true} />
      <GridListWith />
    </Container>
  );
};
