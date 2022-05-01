import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import NavLink from "next/link";
import * as React from "react";
import { CurrentUser } from "../pages/api/user/login";
import Navigation from "./Navigation";

interface IHeaderProps {
  user?: CurrentUser;
}

const Header: React.FunctionComponent<IHeaderProps> = ({ user }) => {
  return (
    <Box bgColor="white">
      <Flex w="60%" mx="auto" py={12} justify="space-between">
        <Flex w="50%">
          <Image alt="Logo" src="/opticalshop.png" />
          <Flex
            flexDir="column"
            justifyContent="center"
            ml={8}
            style={{ gap: "8px" }}
          >
            <Heading as="h5" fontSize="1.2rem" fontWeight="bold">
              Three locations in Edmonton to serve you better:
            </Heading>
            <Text as="span">10524-82 Avenue, T6E 2A4 | (780)437-1110</Text>
            <Text as="span">10108-105 Street, T5J 1C9 | (780)757-7448</Text>
            <Text as="span">13445-97 Street, T5E 4C7 | (780)476-8813</Text>
          </Flex>
        </Flex>
        <Flex
          w="40%"
          flexDir="column"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Box>
            <Heading as="h5" fontSize="2rem" mb={4} color="heading">
              Eye Professionals that Care
            </Heading>
            {!!user ? (
              <Text as="p" textAlign="right">
                Welcome back, <Text as="strong">{user.name}</Text>
              </Text>
            ) : (
              <Text as="p" textAlign="right">
                <NavLink href="/login" passHref>
                  <Link fontSize="1.2rem" fontWeight="bold">
                    Sign in
                  </Link>
                </NavLink>{" "}
                or{" "}
                <NavLink href="/register" passHref>
                  <Link fontSize="1.2rem" fontWeight="bold">
                    Create an Account
                  </Link>
                </NavLink>
              </Text>
            )}
          </Box>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type="text"
              placeholder="Search for all products"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>
      <Navigation />
    </Box>
  );
};

export default Header;
