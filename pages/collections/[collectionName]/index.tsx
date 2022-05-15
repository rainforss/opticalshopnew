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
import { CurrentUser } from "../../api/user/login";

interface IEyeglassesPageProps {
  user?: CurrentUser;
  eyewears: any;
}

interface IParams extends ParsedUrlQuery {
  collectionName: string;
}

const EyeglassesPage: NextPage<IEyeglassesPageProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <BreadCrumb />
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
      }/api/eyewear?pageSize=4&pageNumber=${
        pageNumber || "1"
      }&collectionName=${capitalize(collectionName)}`
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

export default EyeglassesPage;
