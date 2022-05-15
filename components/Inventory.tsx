import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import CollectionItem from "./CollectionItem";

interface IInventoryProps {
  eyewearCollection: any[];
}

const Inventory: React.FunctionComponent<IInventoryProps> = ({
  eyewearCollection,
}) => {
  return (
    <Flex py={4}>
      <Flex w="20%" flexDirection="column">
        <Heading as="h2" mb={6}>
          Shop by
        </Heading>
        <Flex flexDirection="column" mb={4}>
          <Text as="strong">Material</Text>
          <NextLink
            href={{ pathname: `/collections/eyeglasses/acetate` }}
            passHref
          >
            <Link>Acetate</Link>
          </NextLink>
        </Flex>
        <Flex flexDirection="column">
          <Text as="strong">Color</Text>
          <NextLink
            href={{ pathname: `/collections/eyeglasses/acetate` }}
            passHref
          >
            <Link>Black</Link>
          </NextLink>
        </Flex>
      </Flex>
      <Box w="80%">
        <Flex mb={8}>
          <Heading as="h2" pl={4} fontSize="1.5rem">
            Eyeglasses
          </Heading>
        </Flex>
        <Flex flexWrap="wrap" justify={{ base: "space-between" }}>
          {eyewearCollection.map((e) => (
            <CollectionItem key={e.sys.id} eyewear={e} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Inventory;
