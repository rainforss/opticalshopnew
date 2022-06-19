import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { ICharacteristics } from "../@types/generated/contentful";
import { capitalize } from "../utils/capitalize";
import CollectionItem from "./CollectionItem";
import Filter from "./Filter";

interface IInventoryProps {
  eyewearCollection: any[];
  characteristics: ICharacteristics[];
}

const Inventory: React.FunctionComponent<IInventoryProps> = ({
  eyewearCollection,
  characteristics,
}) => {
  const router = useRouter();
  const { collectionName } = router.query;
  return (
    <Flex py={4}>
      <Filter characteristics={characteristics} />
      <Box w="80%">
        <Flex mb={8}>
          <Heading as="h2" pl={4} fontSize="1.5rem">
            {capitalize(collectionName as string)}
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
