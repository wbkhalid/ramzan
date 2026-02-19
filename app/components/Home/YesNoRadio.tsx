"use client";

import { Flex, RadioCards, Text } from "@radix-ui/themes";
import { useState } from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa";

interface YesNoRadioProps {
  value?: boolean | null; // true = Yes, false = No
  onChange?: (value: boolean) => void;
}

const YesNoRadio = ({ value, onChange }: YesNoRadioProps) => {
  // Convert boolean value to "yes"/"no" string for internal use
  const [selectedOption, setSelectedOption] = useState<"yes" | "no">(
    value === true ? "yes" : value === false ? "no" : "no",
  );

  const handleChange = (val: "yes" | "no") => {
    setSelectedOption(val);
    if (onChange) {
      onChange(val === "yes");
    }
  };

  return (
    <Flex maxWidth="450px">
      <RadioCards.Root
        color="green"
        columns="2"
        value={selectedOption}
        onValueChange={(val) => handleChange(val as "yes" | "no")}
      >
        <RadioCards.Item value="yes" className="py-2.5! px-3! w-fit!">
          <Flex align="center" gap="2">
            {selectedOption === "yes" ? (
              <FaCircle className="text-(--green-9)" />
            ) : (
              <FaRegCircle className="text-medium-gray" />
            )}
            <Text weight="medium" size="2">
              Yes
            </Text>
          </Flex>
        </RadioCards.Item>

        <RadioCards.Item value="no" className="py-2.5! px-3! w-fit!">
          <Flex align="center" gap="2">
            {selectedOption === "no" ? (
              <FaCircle className="text-(--green-9)" />
            ) : (
              <FaRegCircle className="text-medium-gray" />
            )}
            <Text weight="medium" size="2">
              No
            </Text>
          </Flex>
        </RadioCards.Item>
      </RadioCards.Root>
    </Flex>
  );
};

export default YesNoRadio;
