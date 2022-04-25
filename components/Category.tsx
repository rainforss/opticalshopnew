import * as React from "react";
import NavLink from "next/link";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import Image from "next/image";

interface ICategoryProps {}

const Category: React.FunctionComponent<ICategoryProps> = (props) => {
  return (
    <Box w="60%" mx="auto" py={16}>
      <Flex justify="space-between">
        <Heading as="h5" mb={12} color="heading">
          Shop For
        </Heading>
        <NavLink href="/collections" passHref>
          <Link>More categories</Link>
        </NavLink>
      </Flex>
      <Flex style={{ gap: "5%" }}>
        <NavLink href="/collections/eyeglasses" passHref>
          <Link w="47.5%" p={8} border="1px solid #dedede">
            <Box>
              <Image
                src="https://cdn.shopify.com/s/files/1/0076/5643/9897/products/IMG_5321_540x.jpg?v=1650478044"
                alt="Eyeglasses collection"
                width={540}
                height={405}
              />
              <Heading
                as="h5"
                fontSize={{ base: "1.5rem" }}
                textAlign="center"
                mt={4}
              >
                Eyeglasses
              </Heading>
            </Box>
          </Link>
        </NavLink>
        <NavLink href="/collections/sunglasses" passHref>
          <Link w="47.5%" p={8} border="1px solid #dedede">
            <Box>
              <Image
                src="https://cdn.shopify.com/s/files/1/0076/5643/9897/products/IMG_5327_540x.jpg?v=1650478342"
                alt="Sunglasses collection"
                width={540}
                height={405}
              />
              <Heading
                as="h5"
                fontSize={{ base: "1.5rem" }}
                textAlign="center"
                mt={4}
              >
                Sunglasses
              </Heading>
            </Box>
          </Link>
        </NavLink>
      </Flex>
    </Box>
  );
};

export default Category;
