import { Box } from "@chakra-ui/react";
import axios from "axios";
import type { NextPage } from "next";
import Booking from "../components/Booking";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import Layout from "../components/Layout";
import { CurrentUser } from "./api/user/login";

interface HomePageProps {
  user?: CurrentUser;
}

const Home: NextPage<HomePageProps> = ({ user }) => {
  const imagesCarousel1 = [
    { alt: "Best optical shop in Edmonton", src: "/best_in_edmonton.jpg" },
    { alt: "Best optical shop in Edmonton", src: "/insurance.jpg" },
    { alt: "Best optical shop in Edmonton", src: "/zeiss_day.jpg" },
  ];
  const imagesCarousel2 = [
    { alt: "Gift card discount", src: "/gift_card.jpg" },
    { alt: "Zeiss DriveSafe lenses", src: "/zeiss_drive_safe.jpg" },
    { alt: "Junior Program", src: "/junior_program.jpg" },
    { alt: "Prescription Safety Eyewear", src: "/safety_eyewear.jpg" },
  ];
  return (
    <Layout user={user}>
      <Box w="50%" h="auto" mx="auto" pt={16} pb={24}>
        <Carousel images={imagesCarousel1} />
      </Box>
      <Box as="hr" w="80%" borderBottom="2px solid grey" mx="auto"></Box>
      <Booking />
      <Box as="hr" w="80%" borderBottom="2px solid grey" mx="auto"></Box>
      <Category />
      <Box as="hr" w="80%" borderBottom="2px solid grey" mx="auto"></Box>
      <Box w="50%" h="auto" mx="auto" pt={16} pb={24}>
        <Carousel images={imagesCarousel2} />
      </Box>
      <Box as="hr" w="80%" borderBottom="2px solid grey" mx="auto"></Box>
    </Layout>
  );
};

export const getStaticProps = () => {
  return {
    props: {},
  };
};

export default Home;
