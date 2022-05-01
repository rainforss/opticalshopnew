import {
  RadioGroup,
  Stack,
  Radio,
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface IRadioInputProps extends ChakraProps {
  options: any[];
  id: string;
  name: string;
  label: string;
  disabled?: boolean;
}

const RadioInput: React.FunctionComponent<IRadioInputProps> = ({
  options,
  id,
  name,
  label,
  disabled,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <RadioGroup id={id} name={name} value={field.value}>
        <Stack spacing={5} direction="row">
          {options.map((o) => (
            <Radio value={o.value} key={o.value}>
              {o.text}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default RadioInput;
