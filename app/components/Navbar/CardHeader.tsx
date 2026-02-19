import { Flex, Heading, Text } from "@radix-ui/themes";
import { Responsive } from "@radix-ui/themes/dist/esm/props/prop-def.js";
import { ReactNode } from "react";

interface Props {
  heading: string;
  label: string;
  labelSize?: Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9">;

  headingSize?: Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9">;

  labelColor?: string;
  headingColor?: string;
  icon?: ReactNode;
  headingWeight?: "light" | "regular" | "medium" | "bold";
  labelWeight?: "light" | "regular" | "medium" | "bold";
  gap?: string;
}

const CardHeader = ({
  heading,
  label,
  headingSize = { initial: "2", sm: "4", md: "6" },
  labelSize = { initial: "1", sm: "2", md: "3" },
  headingColor = "#111827",
  labelColor = "#6b7280",
  icon,
  headingWeight,
  labelWeight = "medium",
  gap,
}: Props) => {
  return (
    <Flex style={{ gap: gap ? gap : "22px" }} align="center" wrap="wrap">
      {icon && icon}

      <Flex gap="0" direction="column">
        <Heading
          style={{ color: headingColor }}
          size={headingSize}
          weight={headingWeight}
        >
          {heading}
        </Heading>
        <Text
          size={labelSize}
          weight={labelWeight}
          style={{ color: labelColor }}
        >
          {label}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardHeader;
