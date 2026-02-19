import { Text } from "@radix-ui/themes";
import { LabelHTMLAttributes, ReactNode } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  inputNode?: ReactNode;
}

const CustomLabel = ({ children, inputNode, ...rest }: Props) => {
  return (
    <label {...rest}>
      <Text as="div" weight="bold" className="text-[13px]! mb-2.5! text-dark!">
        {children}
      </Text>
      {inputNode}
    </label>
  );
};

// 💡 Add this line to resolve the lint error
CustomLabel.displayName = "CustomLabel";

export default CustomLabel;
