import { Flex, Heading, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { ICharacteristics } from "../@types/generated/contentful";
import { allowedFilters } from "../utils/constants";
import MultiselectInput from "./MultiselectInput";

interface IFilterProps {
  characteristics: ICharacteristics[];
}

export interface FilterValues {
  material: string[];
  hingeType: string[];
  frameType: string[];
  frameShape: string[];
  colorGroup: string[];
}

const Filter: React.FunctionComponent<IFilterProps> = ({ characteristics }) => {
  const router = useRouter();
  const { collectionName, ...otherQueries } = router.query;
  const initialValues: any = {
    material: [],
    hingeType: [],
    frameType: [],
    frameShape: [],
    colorGroup: [],
  };
  Object.keys(otherQueries).forEach((k) => {
    if (allowedFilters.includes(k)) {
      initialValues[k] = !!otherQueries[k]
        ? (otherQueries[k] as string).split(",")
        : [];
    }
  });
  return (
    <Flex w="20%" flexDirection="column">
      <Heading as="h2" mb={6}>
        Filters
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, _actions) => {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              material: values.material.join(","),
              hingeType: values.hingeType.join(","),
              colorGroup: values.colorGroup.join(","),
              frameType: values.frameType.join(","),
              frameShape: values.frameShape.join(","),
            },
          });
        }}
      >
        {(props) => {
          return (
            <Form
              style={{
                padding: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {characteristics.map((c) => (
                <MultiselectInput
                  key={c.sys.id}
                  id={c.fields.schemaName}
                  name={c.fields.schemaName}
                  label={c.fields.name}
                  options={c.fields.options}
                />
              ))}
              <Button
                type="submit"
                my="4rem"
                bgColor="#173f5e"
                color="white"
                px="2rem"
                py="1.5rem"
                isLoading={props.isSubmitting}
              >
                Apply
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default Filter;
