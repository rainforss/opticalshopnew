import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import * as React from "react";
import Image from "next/image";
import { Eyewear } from "../types";

interface ICollectionItemProps {
  eyewear: Eyewear;
}

const CollectionItem: React.FunctionComponent<ICollectionItemProps> = ({
  eyewear,
}) => {
  if (eyewear) {
    return (
      <Box w={{ base: "100%", sm: "50%", lg: "25%" }} px={4} pb={12}>
        <Link
          href={`/collections/${eyewear.fields.eyewearType.toLowerCase()}/products/${
            eyewear.fields.name
          }_${eyewear.sys.id}`}
        >
          <Box>
            {eyewear && (
              <Image
                src={`https:${eyewear.fields.pictures[0].fields.file.url}`}
                alt={eyewear.fields.pictures[0].fields.title}
                width={
                  eyewear.fields.pictures[0].fields.file.details.image.width
                }
                height={
                  eyewear.fields.pictures[0].fields.file.details.image.height
                }
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
        </Link>
      </Box>
    );
  }
  return <Box></Box>;
};

export default CollectionItem;
