import { Button, Flex, Text } from "@chakra-ui/react";
import * as React from "react";

interface IBookingProps {}

const Booking: React.FunctionComponent<IBookingProps> = (props) => {
  return (
    <Flex flexDir="column" py={16} w="60%" mx="auto" alignItems="center">
      <Button
        fontSize="1.75rem"
        py={8}
        px={8}
        mb={8}
        bgColor="primary"
        color="white"
        _hover={{ opacity: 0.7 }}
      >
        Book an eye examination
      </Button>
      <Text as="p" textAlign="center">
        Optometrist and Optician whose care! Schedule an eye appointment today!
        Highly trained staff who will take care of all your third party claim
        and your vision needs. Book your appointment online or call us at
        (780)-709-0959
      </Text>
    </Flex>
  );
};

export default Booking;
