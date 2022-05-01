import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Flex,
  ChakraProps,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import React from "react";

interface NumInputProps extends ChakraProps {
  label: string;
  name: string;
  id: string;
  min: number;
  max: number;
}

export const NumInput: React.FC<NumInputProps> = ({
  label,
  name,
  id,
  min,
  max,
  ...chakraProps
}) => {
  const [field, meta, helper] = useField(name);

  return (
    <FormControl {...chakraProps}>
      <FormLabel>{label}</FormLabel>
      <NumberInput
        precision={1}
        step={0.5}
        min={min}
        max={max}
        id={id}
        name={name}
        value={field.value}
        borderColor="#767676"
        onChange={(val) => helper.setValue(val)}
      >
        <NumberInputField textAlign="right" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      {meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};
