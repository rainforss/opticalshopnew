import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Image from "next/image";
import { NextPage } from "next/types";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Layout from "../../../components/Layout";
import { withSessionSsr } from "../../../middleware/session";
import { getEyewearById } from "../../../services/contentful";
import { Eyewear } from "../../../types";
import { isAuthenticated, isAdmin } from "../../../utils/authentication";
import { CurrentUser } from "../../api/user/login";

interface IParams extends ParsedUrlQuery {
  eyeglassesId: string;
}

interface IEyeglassesPageProps {
  eyewear: Eyewear;
  user?: CurrentUser;
}

const EyeglassesPage: NextPage<IEyeglassesPageProps> = ({ eyewear, user }) => {
  const description = documentToHtmlString(eyewear.fields.description);
  return (
    <Layout>
      <BreadCrumb />
      <Box as="hr" w="80%" borderBottom="2px solid grey" mx="auto"></Box>
      <Box w="80%" mx="auto" py={16}>
        <Flex w="100%" mx="auto" flexDir={{ base: "column", md: "row" }}>
          <Flex w="40%" flexDir={{ base: "column" }} style={{ gap: "1.5rem" }}>
            <Image
              src={`https:${eyewear.fields.pictures[0].fields.file.url}`}
              alt={eyewear.fields.pictures[0].fields.title}
              width={eyewear.fields.pictures[0].fields.file.details.image.width}
              height={
                eyewear.fields.pictures[0].fields.file.details.image.height
              }
            />
            {eyewear.fields.pictures.map((p) => (
              <Image
                key={p.sys.id}
                src={`https:${p.fields.file.url}`}
                alt={p.fields.title}
                width={p.fields.file.details.image.width}
                height={p.fields.file.details.image.height}
              />
            ))}
          </Flex>
          <Flex w="60%" flexDir={{ base: "column" }} pl={12}>
            <Heading as="h1">{eyewear.fields.name}</Heading>
            <Heading as="h4" fontSize="1.5rem" mb={8}>
              $ {eyewear.fields.price}
            </Heading>
            <Box as="hr" w="100%" borderBottom="2px solid grey" mx="auto"></Box>
            <ButtonGroup variant="solid" spacing="6" my={8}>
              <Button color="white" bgColor="rgb(235, 62, 62)">
                Buy Now
              </Button>
              <Button bgColor="primary" color="white">
                Add to Cart
              </Button>
            </ButtonGroup>
            <Box as="hr" w="100%" borderBottom="2px solid grey" mx="auto"></Box>
            <Flex py={8} flexDir={{ base: "column" }} style={{ gap: "1rem" }}>
              <Text>Color Group: {eyewear.fields.colorGroup}</Text>
              <Text display="flex" alignItems="center">
                <Text as="span" mr={4}>
                  Color:
                </Text>{" "}
                <Text
                  as="span"
                  bgColor={eyewear.fields.frameColor}
                  display="inline-block"
                  height="100%"
                  width="5rem"
                ></Text>
              </Text>
              <Text>
                Size: {eyewear.fields.eyeSize} - {eyewear.fields.bridgeWidth} -{" "}
                {eyewear.fields.templeLength}
              </Text>
            </Flex>
            <Box dangerouslySetInnerHTML={{ __html: description }}></Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const { eyeglassesId } = params as IParams;
    const id = eyeglassesId.split("_")[1];

    const eyewear = await getEyewearById(id);
    console.log(eyewear);
    if (!isAuthenticated(req) || !isAdmin(req)) {
      return {
        props: {
          eyewear,
        },
      };
    }

    return {
      props: {
        eyewear,
        user: req.session.user,
      },
    };
  }
);

export default EyeglassesPage;
