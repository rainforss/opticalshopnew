import { Box, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import * as React from "react";
import {
  FaCcStripe,
  FaFacebookSquare,
  FaPinterestSquare,
} from "react-icons/fa";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <Box bgColor="white">
      <Flex w="60%" mx="auto" py={24}>
        <Flex w={{ base: "100%", sm: "50%" }}>
          <Box pr={4}>
            <Heading as="h6" fontSize="1.2rem" color="primary" mb={6}>
              Shipping information
            </Heading>
            <Text>
              The Optical Shop Ltd. offers both domestic and international
              shipping for online purchases. Once a purchase has been made, you
              can expect to receive your product within 1-2 weeks (depending on
              the type of lens, availability, and which shipping option you
              choose). If there are any unexpected delays that occur, you will
              receive an email from us notifying you. The option to pick up your
              product personally is also available.{" "}
            </Text>
          </Box>
        </Flex>
        <Flex w={{ base: "100%", sm: "50%" }}>
          <Box pl={4}>
            <Heading as="h6" fontSize="1.2rem" color="primary" mb={6}>
              Return policies
            </Heading>
            <Text>
              To return a product, please keep everything in the original
              packaging and send it back within 30 days of the purchase. The
              product must be sent back in its original damage free condition.
              Once the product has been inspected and approved, a full refund
              for the product will be issued. Please note that prescription
              lenses are non-refundable. If the reason for the return is due to
              an error on our part, we will gladly cover the return shipping
              costs.
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Box as="hr" w="60%" mx="auto" borderBottom="1px solid #f2f2f2"></Box>
      <Flex justifyContent="center" style={{ gap: "2rem" }} py={6}>
        <Link
          href="https://www.facebook.com/theopticalshoponwhyte"
          target="_blank"
        >
          <Icon
            fontSize="1.5rem"
            as={FaFacebookSquare}
            _hover={{ color: "#4267B2" }}
          />
        </Link>
        <Link href="https://www.pinterest.ca/whyteoptical/" target="_blank">
          <Icon
            fontSize="1.5rem"
            as={FaPinterestSquare}
            _hover={{ color: "#c8232c" }}
          />
        </Link>
      </Flex>
      <Box as="hr" w="60%" mx="auto" borderBottom="1px solid #f2f2f2"></Box>
      <Flex
        justifyContent="space-between"
        w="60%"
        mx="auto"
        alignItems="center"
        py={6}
      >
        <Text as="span">© 2022 The Optical Shop Ltd.</Text>
        <Link href="https://www.stripe.com" target="_blank">
          <Text as="span" display="flex" alignItems="center">
            Secured payment by{" "}
            <Icon fontSize="2rem" ml={2} color="#6772e5" as={FaCcStripe} />
          </Text>
        </Link>
        <Link href="https://www.rainforss.me" target="_blank">
          <Text as="span">Managed by © Rainforss</Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
