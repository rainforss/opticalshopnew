import { Box } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import ReactPaginate from "react-paginate";
import BreadCrumb from "../../../components/BreadCrumb";
import Inventory from "../../../components/Inventory";
import Layout from "../../../components/Layout";
import { withSessionSsr } from "../../../middleware/session";
import { isAuthenticated, isAdmin } from "../../../utils/authentication";
import { capitalize } from "../../../utils/capitalize";
import { CurrentUser } from "../../api/user/login";

interface IFilteredCollectionPageProps {
  user?: CurrentUser;
  eyewears: any;
}

interface IParams extends ParsedUrlQuery {
  collectionName: string;
  filter: string;
}

const FilteredCollectionPage: NextPage<IFilteredCollectionPageProps> = ({
  user,
  eyewears,
}) => {
  const router = useRouter();
  const { pageNumber } = router.query;
  return (
    <Layout user={user}>
      <BreadCrumb />
      <Box w="60%" mx="auto">
        <Inventory eyewearCollection={eyewears.items} />
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
    const { collectionName, filter } = params as IParams;
    const { pageNumber } = query;
    const result = await axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.HOST
          : "http://localhost:3000"
      }/api/eyewear?pageSize=16&pageNumber=${
        pageNumber || "1"
      }&collectionName=${capitalize(collectionName)}&filter=${capitalize(
        filter
      )}`
    );
    if (!isAuthenticated(req) || !isAdmin(req))
      return {
        props: {
          eyewears: result.data,
        },
      };

    return {
      props: {
        user: req.session.user,
        eyewears: result.data,
      },
    };
  }
);

export default FilteredCollectionPage;
