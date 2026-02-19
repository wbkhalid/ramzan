"use client";

import CustomLabel from "@/app/components/Form/CustomLabel";
import CustomRadixInput from "@/app/components/Form/CustomRadixInput";
import { Flex, Text, TextField } from "@radix-ui/themes";
import { memo, useDeferredValue, useState } from "react";
import NumberFlow from "@number-flow/react";

interface Props {
  marketRate: number;
  sahulatBazarRate: number;
  itemName: string;
}

const Item = ({ marketRate, sahulatBazarRate, itemName }: Props) => {
  const [amount, setAmount] = useState<number>(0);

  // 👇 defer calculations
  const deferredAmount = useDeferredValue(amount);

  const totalAmountMarketRate = deferredAmount * marketRate;
  const totalAmountSahulatBazarRate = deferredAmount * sahulatBazarRate;

  const isTyping = amount !== deferredAmount;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-5 items-start">
      <CustomLabel
        inputNode={
          <>
            <CustomRadixInput
              type="number"
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder={`Enter Value`}
            >
              <TextField.Slot side="right">KG</TextField.Slot>
            </CustomRadixInput>
          </>
        }
      >
        {itemName} <Text color="red">*</Text>
      </CustomLabel>

      <CustomLabel
        className="min-w-0"
        inputNode={
          <>
            <Text
              as="p"
              weight="medium"
              size="3"
              className="py-3.25 text-slate-gray"
            >
              <NumberFlow value={marketRate} animated={!isTyping} />
              Rs/-
            </Text>
          </>
        }
      >
        Market Rate (per KG)
      </CustomLabel>

      <CustomLabel
        inputNode={
          <>
            <Flex className="gap-2.5!" align="center">
              <div className="h-9.5 w-0.5 bg-medium-gray"></div>
              <Text
                as="p"
                weight="medium"
                size="3"
                wrap="wrap"
                className="py-3.25 text-slate-gray"
              >
                <NumberFlow
                  value={totalAmountMarketRate}
                  animated={!isTyping}
                />
                Rs/-
              </Text>
            </Flex>
          </>
        }
      >
        Total Amount (Market Rate)
      </CustomLabel>

      <CustomLabel
        inputNode={
          <>
            <Text
              as="p"
              weight="medium"
              size="3"
              className="py-3.25 text-slate-gray"
            >
              <NumberFlow value={sahulatBazarRate} animated={!isTyping} />
              Rs/-
            </Text>
          </>
        }
      >
        Sahulat Bazar Rate
      </CustomLabel>

      <CustomLabel
        inputNode={
          <>
            <Text
              as="p"
              weight="medium"
              size="3"
              className="py-3.25 text-slate-gray"
            >
              <NumberFlow
                value={totalAmountSahulatBazarRate}
                animated={!isTyping}
              />
              Rs/-
            </Text>
          </>
        }
      >
        Total Amount (Sahulat Bazar)
      </CustomLabel>

      <CustomLabel
        inputNode={
          <>
            <Text
              as="p"
              weight="medium"
              size="3"
              color="green"
              className="py-3.25 wrap-break-word! whitespace-normal!"
            >
              <NumberFlow
                value={totalAmountMarketRate - totalAmountSahulatBazarRate}
                animated={!isTyping}
              />{" "}
              Rs/-
            </Text>
          </>
        }
      >
        Saving
      </CustomLabel>
    </div>
  );
};

export default memo(Item);
