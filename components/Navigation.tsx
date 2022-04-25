import { Box, Flex, Link } from "@chakra-ui/react";
import NavLink from "next/link";
import * as React from "react";

interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  return (
    <Box h="4rem" bgColor="primary">
      <Flex
        as="nav"
        w="60%"
        h="100%"
        mx="auto"
        alignItems="center"
        color="white"
        fontWeight="bold"
        fontSize={{ base: "1.2rem" }}
        style={{ gap: "2rem" }}
      >
        <NavLink href="/" passHref>
          <Link>HOME</Link>
        </NavLink>
        <NavLink href="/collections/eyeglasses" passHref>
          <Link>EYEGLASSES</Link>
        </NavLink>
        <NavLink href="/collections/sunglasses" passHref>
          <Link>SUNGLASSES</Link>
        </NavLink>
        <NavLink href="/about" passHref>
          <Link>ABOUT US</Link>
        </NavLink>
        <NavLink href="/contact" passHref>
          <Link>CONTACT US</Link>
        </NavLink>
      </Flex>
    </Box>
  );
};

export default Navigation;
