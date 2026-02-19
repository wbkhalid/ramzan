"use client";

import { Flex, RadioCards, Text } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value?: string; // Controlled value
  defaultValue?: string; // Optional fallback
  color?: "green" | "orange" | "blue" | "red";
  columns?: string;
  onChange?: (value: string) => void;
}

const MyRadioGroup = ({
  options,
  value,
  defaultValue,
  color = "green",
  columns,
  onChange,
}: Props) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options[0]?.value,
  );

  // If value prop changes from outside, update internal state
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <Flex maxWidth="450px">
      <RadioCards.Root
        color={color}
        columns={columns ?? String(options.length)}
        value={internalValue}
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
              {internalValue === option.value ? (
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
