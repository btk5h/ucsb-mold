import React from "react";
import tw from "twin.macro";

const Wrapper = tw.nav`
  pt-2
  border-t-4 border-ucsb-gold
  bg-ucsb-navy
  text-white
`;

const Inner = tw.div`
  relative
  mx-auto
  max-w-6xl
`;

const Title = tw.h1`
  text-xl font-bold text-ucsb-gold
`;

const NavBar: React.FC = () => {
  return (
    <Wrapper>
      <Inner>
        <Title>UCSB Mapache On-Line Data</Title>
      </Inner>
    </Wrapper>
  );
};

export default NavBar;
