import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface IMultiselectInputProps {
  id: string;
  name: string;
  label: string;
  options: string[];
}

const MultiselectInput: React.FunctionComponent<IMultiselectInputProps> = ({
  id,
  name,
  label,
  options,
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      <FormLabel htmlFor={id} fontWeight="bold" my={4}>
        {label}
      </FormLabel>
      <Stack spacing={4} direction="column">
        {options.map((o) => (
          <Checkbox
            key={o}
            isChecked={field.value.includes(o)}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                helpers.setValue(field.value.concat(o));
              } else {
                helpers.setValue(field.value.filter((v: string) => v !== o));
              }
            }}
          >
            {o}
          </Checkbox>
        ))}
      </Stack>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default MultiselectInput;
