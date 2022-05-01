import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import Image from "next/image";

interface ICollectionItemProps {
  eyewear: any;
}

const CollectionItem: React.FunctionComponent<ICollectionItemProps> = ({
  eyewear,
}) => {
  if (eyewear) {
    return (
      <Box w={{ base: "100%", sm: "50%", lg: "25%" }} px={4}>
        {eyewear && (
          <Image
            src={`https:${eyewear.fields.pictures[0].fields.file.url}`}
            alt={eyewear.fields.pictures[0].fields.title}
            width="300"
            height="200"
          />
        )}
        <Flex flexDir="column" mt={8}>
          <Heading as="h6" fontSize="1.1rem" fontWeight="normal">
            {eyewear.fields.name}
          </Heading>
          <Text as="strong" fontSize="1.3rem">
            ${eyewear.fields.price}
          </Text>
        </Flex>
      </Box>
    );
  }
  return <Box></Box>;
};

export default CollectionItem;
