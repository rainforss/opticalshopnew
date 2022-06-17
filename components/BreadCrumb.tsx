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
  const pathWithoutQuery = router.asPath.split("?").slice(0, 1).join();
  return (
    <Box width="60%" mx="auto" my={8}>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">HOME</BreadcrumbLink>
        </BreadcrumbItem>
        {pathWithoutQuery
          .split("/")
          .slice(1)
          .map((p, index) => (
            <BreadcrumbItem key={p}>
              <BreadcrumbLink
                href={`/${pathWithoutQuery
                  .split("/")
                  .slice(1, index + 2)
                  .join("/")}`}
                isCurrentPage={
                  `/${pathWithoutQuery
                    .split("/")
                    .slice(1, index + 2)
                    .join("/")}` === pathWithoutQuery
                }
              >
                {p.includes("_")
                  ? decodeURIComponent(p).split("_")[0].toUpperCase()
                  : p.toUpperCase()}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
    </Box>
  );
};

export default BreadCrumb;
