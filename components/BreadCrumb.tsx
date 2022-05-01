import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import * as React from "react";

interface IBreadCrumbProps {}

const BreadCrumb: React.FunctionComponent<IBreadCrumbProps> = (props) => {
  const router = useRouter();
  if (router.asPath.split("/").length < 3) {
    return null;
  }
  return (
    <Box width="60%" mx="auto" my={8}>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">HOME</BreadcrumbLink>
        </BreadcrumbItem>
        {router.asPath
          .split("/")
          .slice(1)
          .map((p, index) => (
            <BreadcrumbItem key={p}>
              <BreadcrumbLink
                href={`/${router.asPath
                  .split("/")
                  .slice(1, index + 2)
                  .join("/")}`}
                isCurrentPage={
                  `/${router.asPath
                    .split("/")
                    .slice(1, index + 2)
                    .join("/")}` === router.asPath
                }
              >
                {p.includes("_")
                  ? p.split("_")[0].toUpperCase()
                  : p.toUpperCase()}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
    </Box>
  );
};

export default BreadCrumb;
