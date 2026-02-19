"use client";

import { Flex, RadioCards, Text } from "@radix-ui/themes";
import { useState } from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  defaultValue?: string;
  color?: "green" | "orange" | "blue" | "red";
  columns?: string;
  onChange?: (value: string) => void;
}

const MyRadioGroup = ({
  options,
  defaultValue,
  color = "green",
  columns,
  onChange,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState(
    defaultValue ?? options[0]?.value,
  );

  const handleChange = (value: string) => {
    setSelectedOption(value);
    onChange?.(value);
  };

  return (
    <Flex maxWidth="450px">
      <RadioCards.Root
        color={color}
        columns={columns ?? String(options.length)}
        value={selectedOption}
        onValueChange={handleChange}
      >
        {options.map((option) => (
          <RadioCards.Item
            key={option.value}
            value={option.value}
            className="py-2.5! px-3! w-fit!"
            style={{ justifyContent: "start" }}
          >
            <Flex align="center" gap="2" className="w-full">
              {selectedOption === option.value ? (
                <FaCircle size={14} className="text-(--green-9) shrink-0" />
              ) : (
                <FaRegCircle size={14} className="text-medium-gray shrink-0" />
              )}
              <Text weight="medium" size="2">
                {option.label}
              </Text>
            </Flex>
          </RadioCards.Item>
        ))}
      </RadioCards.Root>
    </Flex>
  );
};

export default MyRadioGroup;
