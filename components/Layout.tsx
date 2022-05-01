import { Box, Heading } from "@chakra-ui/react";
import * as React from "react";
import { CurrentUser } from "../pages/api/user/login";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
  children: React.ReactNode;
  user?: CurrentUser;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ user, children }) => {
  return (
    <Box w="100%" bgColor="#f3f3f3">
      <Banner>
        <Heading
          as="h2"
          fontSize="1.2rem"
          fontWeight="normal"
          py={2}
          textAlign="center"
          color="rgb(255, 246, 129)"
        >
          Free Shipping to the USA/Canada. USE CODE: FUSACAD
        </Heading>
      </Banner>
      <Header user={user} />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
