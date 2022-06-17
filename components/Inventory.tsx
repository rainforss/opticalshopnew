import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { ICharacteristics } from "../@types/generated/contentful";
import CollectionItem from "./CollectionItem";

interface IInventoryProps {
  eyewearCollection: any[];
  characteristics: ICharacteristics[];
}

const Inventory: React.FunctionComponent<IInventoryProps> = ({
  eyewearCollection,
  characteristics,
}) => {
  console.log(characteristics);
  return (
    <Flex py={4}>
      <Flex w="20%" flexDirection="column">
        <Heading as="h2" mb={6}>
          Shop by
        </Heading>
        {characteristics.map((c) => (
          <Flex flexDirection="column" mb={4} key={c.sys.id}>
            <Text as="strong" mb={2}>
              {c.fields.name}
            </Text>

            {c.fields.options.map((o) => (
              <NextLink
                key={o}
                href={{ pathname: `/collections/eyeglasses/acetate` }}
                passHref
              >
                <Link>{o}</Link>
              </NextLink>
            ))}
          </Flex>
        ))}
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
