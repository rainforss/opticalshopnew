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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as React from "react";
import { createEyewear } from "../services/contentful";
import ColorSelect from "./ColorSelect";
import { NumInput } from "./NumInput";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

interface IEyewearFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IEyewearValues {
  name: string;
  eyeSize: string | number;
  bridgeWidth: string | number;
  templeLength: string | number;
  material: string;
  frameShape: string;
  frameType: string;
  frameColor: string;
  colorGroup: string;
  hingeType: string;
  nosePads: boolean;
  barcode: string;
  row: string | number;
  column: string | number;
  price: string | number;
  inStock: boolean;
  eyewearType: string;
}

const EyewearForm: React.FunctionComponent<IEyewearFormProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const initialValues: IEyewearValues = {
    name: "",
    eyeSize: "50",
    bridgeWidth: "21",
    templeLength: "145",
    material: "Metal",
    frameShape: "Aviator Flattop",
    frameType: "Full-rim",
    frameColor: "#000000",
    colorGroup: "Grey",
    hingeType: "Standard",
    nosePads: true,
    barcode: "",
    row: "",
    column: "",
    price: "",
    inStock: true,
    eyewearType: "Sunglasses",
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent overflow="auto">
        <ModalHeader>Eyewear Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="100%" bg="white" borderRadius="10px" p="2rem">
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                try {
                  actions.setSubmitting(true);
                  values.eyeSize = parseFloat(values.eyeSize as string);
                  values.bridgeWidth = parseFloat(values.bridgeWidth as string);
                  values.templeLength = parseFloat(
                    values.templeLength as string
                  );
                  values.row = parseInt(values.row as string);
                  values.column = parseInt(values.column as string);
                  values.price = parseFloat(values.price as string);
                  const createdEyewear = await axios.post(
                    "/api/eyewear",
                    values
                  );
                  actions.setSubmitting(false);
                  console.log(createdEyewear.data);
                } catch (error: any) {
                  actions.setSubmitting(false);
                  return toast({
                    title: error.error.name,
                    description: error.error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            >
              {(props) => {
                return (
                  <Form
                    style={{
                      padding: "0",
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <TextInput
                      name="name"
                      id="name"
                      type="text"
                      label="Item Name"
                      w="100%"
                      p="1rem"
                    />
                    <TextAreaInput
                      name="description"
                      id="description"
                      label="Item Description"
                      w="100%"
                      p="1rem"
                    />
                    <NumInput
                      label="Eye size"
                      name="eyeSize"
                      id="eyeSize"
                      w="100%"
                      p="1rem"
                      min={0}
                      max={100}
                    />
                    <NumInput
                      label="Bridge width"
                      name="bridgeWidth"
                      id="bridgeWidth"
                      min={0}
                      max={100}
                      w="100%"
                      p="1rem"
                    />

                    <NumInput
                      label="Temple length"
                      name="templeLength"
                      id="templeLength"
                      min={0}
                      max={100}
                      w="100%"
                      p="1rem"
                    />
                    <ColorSelect
                      id="colorGroup"
                      name="colorGroup"
                      label="Frame Color"
                      w="100%"
                    />
                    <RadioInput
                      name="material"
                      id="material"
                      label="Material"
                      options={[
                        { text: "Metal", value: "Metal" },
                        { text: "Acetate", value: "Acetate" },
                        { text: "Composite", value: "Composite" },
                        { text: "Titanium", value: "Titanium" },
                      ]}
                      w="100%"
                      p="1rem"
                    />
                    <SelectInput
                      name="frameShape"
                      label="Frame Shape"
                      id="frameShape"
                      options={[
                        { text: "Aviator Flattop", value: "Aviator Flattop" },
                        {
                          text: "Aviator Stretched",
                          value: "Aviator Stretched",
                        },
                      ]}
                      w="100%"
                      p="1rem"
                    />
                    <RadioInput
                      name="frameType"
                      id="frameType"
                      label="Frame Type"
                      options={[
                        { text: "Full-rim", value: "Full-rim" },
                        { text: "Semi-rimless", value: "Semi-rimless" },
                        { text: "Full-rimless", value: "Full-rimless" },
                      ]}
                      w="100%"
                      p="1rem"
                    />
                    <RadioInput
                      name="hingeType"
                      id="hingeType"
                      label="Hinge Type"
                      options={[
                        { text: "Standard", value: "Standard" },
                        { text: "Spring", value: "Spring" },
                        { text: "Flex", value: "Flex" },
                        { text: "Hingeless", value: "Hingeless" },
                      ]}
                      w="100%"
                      p="1rem"
                    />
                    <RadioInput
                      name="nosePads"
                      id="nosePads"
                      label="Nose pads"
                      options={[
                        { text: "YES", value: true },
                        { text: "NO", value: false },
                      ]}
                      w="100%"
                      p="1rem"
                    />

                    <TextInput
                      label="Item Barcode"
                      name="barcode"
                      id="barcode"
                      type="text"
                      w="100%"
                      p="1rem"
                    />
                    <TextInput
                      label="Row position"
                      name="row"
                      id="row"
                      type="text"
                      w="100%"
                      p="1rem"
                    />
                    <TextInput
                      label="Column position"
                      name="column"
                      id="column"
                      type="text"
                      w="100%"
                      p="1rem"
                    />
                    <TextInput
                      label="Price"
                      name="price"
                      id="price"
                      type="text"
                      w="100%"
                      p="1rem"
                    />
                    <SelectInput
                      label="In Stock"
                      name="inStock"
                      id="inStock"
                      options={[
                        { text: "YES", value: true },
                        { text: "NO", value: false },
                      ]}
                      w="100%"
                      p="1rem"
                    />
                    <SelectInput
                      label="Eyewear Type"
                      name="eyewearType"
                      id="eyewearType"
                      options={[
                        { text: "Sunglasses", value: "Sunglasses" },
                        { text: "Eyeglasses", value: "Eyeglasses" },
                        { text: "Ski Goggles", value: "Ski Goggles" },
                      ]}
                      w="100%"
                      p="1rem"
                    />
                    <Button
                      type="submit"
                      isLoading={props.isSubmitting}
                      mx="auto"
                      my="4rem"
                      bgColor="#173f5e"
                      color="white"
                      px="2rem"
                      py="1.5rem"
                    >
                      ADD
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EyewearForm;
