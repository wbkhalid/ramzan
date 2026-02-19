import CustomRadixTextarea from "@/app/components/Form/CustomRadixTextarea";
import MyRadioGroup from "@/app/components/Form/MyRadioGroup";
import MyBadge from "@/app/components/MyBadge";
import { Video01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge, Button, Flex, RadioGroup, Text } from "@radix-ui/themes";
import { IoIosInformationCircle } from "react-icons/io";
import CardHeader from "../../../Navbar/CardHeader";
import UploadImagesForm from "../UploadImagesForm";

const Feedback = () => {
  return (
    <>
      <div className="py-5 gap-5 flex flex-wrap sm:flex-nowrap justify-center">
        <Badge
          radius="full"
          color="green"
          className="font-bold! text-[17px]! py-2.25! px-3.5!"
        >
          1
        </Badge>
        <div className="w-full">
          <Flex justify="between" className="mb-5" wrap="wrap" gap="2">
            <CardHeader
              headingSize="5"
              heading="Pictorial Evidence After Food Serving"
              label="Upload photographic documentation (all three images required)"
            />
            <MyBadge label="Deadline : 8:00 PM" />
          </Flex>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-2.5 items-end">
            <UploadImagesForm
              label="After Food Serving"
              description="Setup and preparation"
            />

            <UploadImagesForm
              label="Feed back Video"
              description="Setup and preparation"
              buttonLabel="Upload Video"
              message="Upload 30 sec Video (mp4)"
              icon={
                <Badge className="p-3! rounded-[10px]! shadow-[0px_0px_0px_1.24px_#CBD5E1]/50!">
                  <HugeiconsIcon
                    icon={Video01Icon}
                    size={30}
                    className="text-slate-gray!"
                  />
                </Badge>
              }
            />
          </div>

          <div className="mb-2.5">
            <div className="mb-5">
              <CardHeader
                headingSize="5"
                heading="Feedback by Food Officer"
                label="Feedback"
              />
            </div>

            <RadioGroup.Root defaultValue="1" name="example">
              <MyRadioGroup
                options={[
                  { label: "Excellent", value: "excellent" },
                  { label: "Good", value: "good" },
                  { label: "Average", value: "average" },
                  { label: "Poor", value: "poor" },
                ]}
              />
            </RadioGroup.Root>
          </div>

          <div className="mb-5">
            <CardHeader
              headingSize="5"
              heading="Additional Remarks"
              label="Any observations, issues, or additional information"
            />
          </div>
          <CustomRadixTextarea placeholder="Enter Remarks..." />
        </div>
      </div>
      <div className="border-t border-medium-gray pt-3.75 -mx-7.5!">
        <Flex align="center" gap="2" justify="between" className="px-5!">
          <Flex align="center" gap="2">
            <IoIosInformationCircle size={20} className="text-dark-gray" />

            <Text size="2" weight="medium">
              All fields marked with <Text color="red">*</Text> are mandatory
            </Text>
          </Flex>
          <Button
            type="submit"
            className="py-2.5! px-4.25! h-fit! rounded-[3.5px]! text-[10px]! font-bold!"
            color="green"
          >
            Save & Continue
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default Feedback;
