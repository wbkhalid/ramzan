"use client";

import { Flex, RadioCards, Text } from "@radix-ui/themes";
import { useState } from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa";

const YesNoRadio = () => {
  const [selectedOption, setSelectedOption] = useState<"yes" | "no">("no");

  return (
    <Flex maxWidth="450px">
      <RadioCards.Root
        color="green"
        columns="2"
        value={selectedOption}
        onValueChange={(value) => setSelectedOption(value as "yes" | "no")}
      >
        {/* YES */}
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

        {/* NO */}
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
