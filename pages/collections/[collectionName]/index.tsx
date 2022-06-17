import { Box } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Layout from "../../../components/Layout";
import { withSessionSsr } from "../../../middleware/session";
import { isAuthenticated, isAdmin } from "../../../utils/authentication";
import { capitalize } from "../../../utils/capitalize";
import Inventory from "../../../components/Inventory";
import { CurrentUser } from "../../api/user/login";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { ICharacteristics } from "../../../@types/generated/contentful";

interface IEyeglassesPageProps {
  user?: CurrentUser;
  eyewears: any;
  characteristics: ICharacteristics[];
}

interface IParams extends ParsedUrlQuery {
  collectionName: string;
}

const EyeglassesPage: NextPage<IEyeglassesPageProps> = ({
  user,
  eyewears,
  characteristics,
}) => {
  const router = useRouter();
  const { pageNumber } = router.query;
  return (
    <Layout user={user}>
      <BreadCrumb />
      <Box w="60%" mx="auto">
        <Inventory
          eyewearCollection={eyewears.items}
          characteristics={characteristics}
        />
      </Box>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        pageRangeDisplayed={3}
        forcePage={pageNumber ? parseInt(pageNumber as string) - 1 : 0}
        onPageChange={({ selected }) => {
          router.query.pageNumber = (selected + 1).toString();
          router.push(router);
        }}
        pageCount={Math.ceil(eyewears.total / 16)}
      />
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params, query }) {
    const { collectionName } = params as IParams;
    const { pageNumber } = query;
    const result = await axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.HOST
          : "http://localhost:3000"
      }/api/eyewear?pageSize=16&pageNumber=${
        pageNumber || "1"
      }&collectionName=${capitalize(collectionName)}`
    );
    const characteristicResult = await axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.HOST
          : "http://localhost:3000"
      }/api/characteristic`
    );
    if (!isAuthenticated(req) || !isAdmin(req))
      return {
        props: {
          eyewears: result.data,
          characteristics: characteristicResult.data,
        },
      };

    return {
      props: {
        user: req.session.user,
        eyewears: result.data,
        characteristics: characteristicResult.data,
      },
    };
  }
);

export default EyeglassesPage;
