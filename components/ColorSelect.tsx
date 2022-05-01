import {
  Box,
  Button,
  ChakraProps,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Select,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";
import { NAMED_COLORS } from "../utils/constants";
import SelectInput from "./SelectInput";
import { PopoverAnchor, PopoverTrigger } from "./Temp";

interface IColorSelectProps extends ChakraProps {
  id: string;
  name: string;
  label: string;
}

const ColorSelect: React.FunctionComponent<IColorSelectProps> = ({
  id,
  name,
  label,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);
  const [frameColorField, frameColorMeta, _frameColorHelpers] =
    useField("frameColor");
  const [searchString, setSearchString] = React.useState("");
  const filteredColors = NAMED_COLORS.filter((color) =>
    color.group.toLowerCase().includes(searchString.toLowerCase())
  );
  return (
    <Popover>
      <FormControl p="1rem" {...chakraProps}>
        <FormLabel>{label}</FormLabel>
        <InputGroup>
          <PopoverAnchor>
            <Input
              pr="7.5rem"
              type="text"
              id={id}
              name={name}
              value={field.value}
              disabled
              borderColor="#767676"
              w="100%"
            />
          </PopoverAnchor>
          <InputRightElement width="7.5rem">
            <PopoverTrigger>
              <Button h="1.75rem" size="md">
                Colorpicker
              </Button>
            </PopoverTrigger>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Input
            placeholder="Search color group"
            w="75%"
            name={name}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </PopoverHeader>
        <PopoverBody>
          <Select
            onChange={(e) => {
              _helpers.setValue(
                NAMED_COLORS.find((c) => c.value === e.target.value)!.group
              );
              frameColorField.onChange(e);
            }}
            value={frameColorField.value}
            id="frameColor"
            name="frameColor"
            borderColor="#767676"
          >
            <option value="">-- Please Select an Option --</option>
            {filteredColors.map((o) => {
              return (
                <option
                  style={{
                    color: field.value === "white" ? "black" : "white",
                    backgroundColor: o.value,
                  }}
                  key={o.text}
                  data-group={o.group}
                  value={o.value}
                >
                  {o.text}{" "}
                </option>
              );
            })}
          </Select>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ColorSelect;
