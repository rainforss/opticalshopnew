import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Entry } from "contentful-management";
import NavLink from "next/link";
import * as React from "react";
import CollectionItem from "./CollectionItem";

interface ICollectionProps {
  collectionTitle: string;
  collectionUrl: string;
  collectionItems: any[];
}

const Collection: React.FunctionComponent<ICollectionProps> = (props) => {
  if (!props.collectionItems) {
    return null;
  }
  return (
    <Box w="60%" mx="auto" py={16}>
      <Flex justify="space-between">
        <Heading as="h5" mb={12} color="heading">
          {props.collectionTitle}
        </Heading>
        <NavLink href={props.collectionUrl} passHref>
          <Link>More of collection</Link>
        </NavLink>
      </Flex>
      <Flex>
        {props.collectionItems.map((e) => (
          <CollectionItem eyewear={e} key={e?.sys.id} />
        ))}
      </Flex>
    </Box>
  );
};

export default Collection;
