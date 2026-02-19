import CustomRadixInput from "@/app/components/Form/CustomRadixInput";
import MyBadge from "@/app/components/MyBadge";
import {
  ArrowUp01Icon,
  Cancel01Icon,
  PlusSignCircleIcon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { IoIosInformationCircle } from "react-icons/io";
import CardHeader from "../../../Navbar/CardHeader";
import UploadImagesForm from "../UploadImagesForm";

const Food = () => {
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
              heading="All Menu Details"
              label="Menu Details"
            />
            <MyBadge label="Deadline : 6:00 PM" />
          </Flex>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-2.5 items-end">
            <div className="col-span-2">
              <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
                Enter Menu Items <Text color="red">*</Text>
              </Text>
              <CustomRadixInput placeholder="Enter Menu Name" />
            </div>
            <Button color="green" className="py-3.25! h-fit! rounded-[10.5px]!">
              <Flex className="gap-2.5" align="center">
                <HugeiconsIcon
                  icon={PlusSignCircleIcon}
                  color="white"
                  size={20}
                />
                <Text className="text-white">Add New Item</Text>
              </Flex>
            </Button>
          </div>
          <Flex className="gap-2.5! mb-5!">
            <Button
              color="orange"
              className="py-2.5! px-3! bg-(--orange-9)/10! rounded-[7px]! ring-1! ring-(--orange-9)/50! h-fit!"
            >
              <Flex className="gap-2.5" align="center">
                <Text className="text-[#472D03]!">Alu Keema</Text>
                <HugeiconsIcon
                  className="text-(--orange-9)"
                  icon={Cancel01Icon}
                  color="white"
                  size={20}
                />
              </Flex>
            </Button>
            <Button
              color="orange"
              className="py-2.5! px-3! bg-(--orange-9)/10! rounded-[7px]! ring-1! ring-(--orange-9)/50! h-fit!"
            >
              <Flex className="gap-2.5" align="center">
                <Text className="text-[#472D03]!">Biryani</Text>
                <HugeiconsIcon
                  className="text-(--orange-9)"
                  icon={Cancel01Icon}
                  color="white"
                  size={20}
                />
              </Flex>
            </Button>
            <Button
              color="orange"
              className="py-2.5! px-3! bg-(--orange-9)/10! rounded-[7px]! ring-1! ring-(--orange-9)/50! h-fit!"
            >
              <Flex className="gap-2.5" align="center">
                <Text className="text-[#472D03]!">Samosa</Text>
                <HugeiconsIcon
                  className="text-(--orange-9)"
                  icon={Cancel01Icon}
                  color="white"
                  size={20}
                />
              </Flex>
            </Button>
          </Flex>
          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Menu Photos <Text color="red">*</Text>
            </Text>
            <div className="w-full sm:w-90 ">
              <UploadImagesForm description="Menu Photos" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 gap-5 flex flex-wrap sm:flex-nowrap justify-center">
        <Badge
          radius="full"
          color="green"
          className="font-bold! text-[17px]! py-2.25! px-3.5!"
        >
          2
        </Badge>
        <div className="w-full">
          <Flex justify="between" className="mb-5" wrap="wrap" gap="2">
            <CardHeader
              headingSize="5"
              heading="Beneficiaries"
              label="Record number of Beneficiaries"
            />
          </Flex>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-2.5 items-end">
            <div className="col-span-2">
              <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
                Beneficiaries <Text color="red">*</Text>
              </Text>
              <CustomRadixInput type="number" placeholder="Enter Beneficiaries">
                <TextField.Slot>
                  <HugeiconsIcon icon={UserGroup02Icon} size={20} />
                </TextField.Slot>
                <TextField.Slot>
                  <Flex
                    direction="column"
                    gap="0"
                    justify="center"
                    align="center"
                  >
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      size={20}
                      className="-mb-1"
                    />
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      size={20}
                      className="rotate-180 -mt-1"
                    />
                  </Flex>
                </TextField.Slot>
              </CustomRadixInput>
            </div>
          </div>
          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Serving Photos <Text color="red">*</Text>
            </Text>
            <div className="w-full sm:w-90 ">
              <UploadImagesForm description="Serving Photos" />
            </div>
          </div>
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

export default Food;
