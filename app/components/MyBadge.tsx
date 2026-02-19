import { Badge, Flex, Text } from "@radix-ui/themes";
import { FaCircle } from "react-icons/fa";

type Variant = "deadline" | "success";

interface Props {
  label: string;
  variant?: Variant;
}

const variantStyles: Record<Variant, { bg: string; text: string }> = {
  deadline: {
    bg: "#B5700033",
    text: "#b57000",
  },
  success: {
    bg: "#16A34A33",
    text: "#16A34A",
  },
};

const MyBadge = ({ label, variant = "deadline" }: Props) => {
  const styles = variantStyles[variant];

  return (
    <Badge
      className="py-3! px-6.5! rounded-[10px]!"
      style={{ backgroundColor: styles.bg }}
    >
      <Flex align="center" className="gap-2.5!">
        <FaCircle
          style={{
            color: styles.text,
          }}
          size={9}
        />
        <Text
          size="3"
          className="font-semibold!"
          style={{
            color: styles.text,
          }}
        >
          {label}
        </Text>
      </Flex>
    </Badge>
  );
};

export default MyBadge;
