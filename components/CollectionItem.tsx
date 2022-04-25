import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { EyewearQuery } from "../queries/generated";
import Image from "next/image";

interface ICollectionItemProps {
  eyewear?: EyewearQuery["eyewear"] | null;
}

const CollectionItem: React.FunctionComponent<ICollectionItemProps> = ({
  eyewear,
}) => {
  if (eyewear) {
    return (
      <Box w={{ base: "100%", sm: "50%", lg: "25%" }} px={4}>
        {eyewear && (
          <Image
            src={eyewear.picturesCollection!.items[0]!.url!}
            alt={eyewear.picturesCollection!.items[0]!.description!}
            width="300"
            height="200"
          />
        )}
        <Flex flexDir="column" mt={8}>
          <Heading as="h6" fontSize="1.1rem" fontWeight="normal">
            {eyewear.name}
          </Heading>
          <Text as="strong" fontSize="1.3rem">
            ${eyewear.price}
          </Text>
        </Flex>
      </Box>
    );
  }
  return <Box></Box>;
};

export default CollectionItem;
