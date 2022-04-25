import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery } from "urql";
import Booking from "../components/Booking";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import Collection from "../components/Collection";
import Layout from "../components/Layout";
import {
  EyewearDocument,
  EyewearQuery,
  EyewearsDocument,
  EyewearsQuery,
} from "../queries/generated";

const Home: NextPage = () => {
  const [result] = useQuery<EyewearsQuery>({
    query: EyewearsDocument,
  });
  const { data } = result;
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
  console.log(data?.eyewearCollection);
  return (
    <Layout>
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
      <Collection
        collectionTitle="Featured Collection"
        collectionUrl="/eyeglasses"
        collectionItems={data?.eyewearCollection!}
      />
    </Layout>
  );
};

export default Home;
