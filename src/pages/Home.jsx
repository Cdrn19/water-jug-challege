import React from "react";
import Inputs from "../components/Inputs";
import Solution from "../components/Solution";
import { ProviderChallenge } from "../hook/useChallenge";

const Home = () => {
  return (
    <ProviderChallenge>
      <Inputs />
      <Solution />
    </ProviderChallenge>
  );
};

export default Home;
