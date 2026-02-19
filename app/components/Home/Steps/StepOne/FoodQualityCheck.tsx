import { Badge, Flex, Text } from "@radix-ui/themes";
import { FaCircle } from "react-icons/fa";
import CardHeader from "../../../Navbar/CardHeader";
import YesNoRadio from "../../YesNoRadio";
import UploadImagesForm from "../UploadImagesForm";

const FoodQualityCheck = () => {
  return (
    <>
      <div className="py-5 gap-5 flex flex-wrap sm:flex-nowrap justify-center">
        <Badge
          radius="full"
          color="blue"
          className="font-bold! text-[17px]! py-2.25! px-3.5!"
        >
          1
        </Badge>
        <div className="w-full">
          <Flex justify="between" className="mb-5" wrap="wrap" gap="2">
            <CardHeader
              headingSize="5"
              heading="Daily Food Quality Check"
              label="Assess overall food quality and safety standards"
            />
            <Badge color="orange" className="py-3! px-6.5! rounded-[10px]!">
              <Flex align="center" className="gap-2.5!">
                <FaCircle className="text-(--orange-9)" size={9} />
                <Text size="3" className="font-semibold!">
                  Deadline : 4:00 PM
                </Text>
              </Flex>
            </Badge>
          </Flex>
          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Food Quality Satisfactory <Text color="red">*</Text>
            </Text>
            <YesNoRadio />
          </div>
          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Food Packaging <Text color="red">*</Text>
            </Text>
            <YesNoRadio />
          </div>
          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Food Quality Pictures <Text color="red">*</Text>
            </Text>
            <UploadImagesForm />
          </div>
        </div>
      </div>
      {/* <MCQ
            questionNumber={1}
            heading={"Daily Food Quality Check"}
            label={"Assess overall food quality and safety standards"}
            question={"Food Quality Satisfactory"}
          /> */}
    </>
  );
};

export default FoodQualityCheck;
