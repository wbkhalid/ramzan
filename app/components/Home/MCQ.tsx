import { Flex, Badge, Text } from "@radix-ui/themes";
import CardHeader from "../Navbar/CardHeader";
import YesNoRadio from "./YesNoRadio";

interface Props {
  questionNumber: number;
  heading: string;
  label: string;
  question: string;
}
const MCQ = ({ questionNumber, heading, label, question }: Props) => {
  return (
    <Flex className="py-5 gap-5">
      <Badge
        radius="full"
        color="blue"
        className="font-bold! text-[17px]! py-2.25! px-3.5!"
      >
        {questionNumber}
      </Badge>
      <div>
        <div className="mb-5">
          <CardHeader headingSize="5" heading={heading} label={label} />
        </div>
        <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
          {question} <Text color="red">*</Text>
        </Text>
        <YesNoRadio />
      </div>
    </Flex>
  );
};

export default MCQ;
