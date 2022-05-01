import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import EyewearForm from "../../components/EyewearForm";
import Layout from "../../components/Layout";
import { withSessionSsr } from "../../middleware/session";
import { isAuthenticated, isAdmin } from "../../utils/authentication";
import { User } from "../api/user/login";

interface IInventoryPageProps {
  user: User;
}

const InventoryPage: React.FunctionComponent<IInventoryPageProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Layout>
      <Button onClick={onOpen}>Open Modal</Button>
      <EyewearForm isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    if (!isAuthenticated(req) || !isAdmin(req))
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    return {
      props: {
        user: req.session.user,
      },
    };
  }
);

export default InventoryPage;
