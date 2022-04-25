import { Box } from "@chakra-ui/react";
import * as React from "react";

interface IBannerProps {
  children: React.ReactNode;
}

const Banner: React.FunctionComponent<IBannerProps> = ({ children }) => {
  return (
    <Box w="100%" bg="rgb(235, 62, 62)" position="sticky">
      {children}
    </Box>
  );
};

export default Banner;
