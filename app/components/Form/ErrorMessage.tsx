import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge, Flex, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  varient?: "1" | "2";
}

const ErrorMessage = ({ children, varient = "2" }: Props) => {
  if (!children) return null;
  return (
    <>
      {varient === "1" ? (
        <Text
          as="p"
          className="pt-2.5 px-3 text-white! rounded-[7px]"
          weight="medium"
        >
          {children}
        </Text>
      ) : (
        <Badge
          color="orange"
          className="py-2.5! px-3! rounded-[7px]! shadow-[0px_0px_0px_1px_rgba(181,112,0,0.5)] bg-(--orange-9)/10! mt-5"
        >
          <Flex align="center" gap="2">
            <HugeiconsIcon icon={InformationCircleIcon} size={20} />
            <Text size="3" weight="medium">
              {children}
            </Text>
          </Flex>
        </Badge>
      )}
    </>
  );
};

export default ErrorMessage;
