import CustomRadixInput from "@/app/components/Form/CustomRadixInput";
import MyRadioGroup from "@/app/components/Form/MyRadioGroup";
import MyBadge from "@/app/components/MyBadge";
import { LocationShare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge, Box, Button, Flex, RadioGroup, Text } from "@radix-ui/themes";
import Image from "next/image";
import { IoIosInformationCircle } from "react-icons/io";
import CardHeader from "../../../Navbar/CardHeader";
import YesNoRadio from "../../YesNoRadio";
import UploadImagesForm from "../UploadImagesForm";
import useCheckLists from "@/app/react-query/hooks/ramzan-monitoring/useCheckLists";

const Setup = () => {
  const { data: checkLists } = useCheckLists();

  console.log(checkLists, "checklist");

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
              heading="DC Office Focal Person Details"
              label="Update Focal Person Details"
            />
            <MyBadge label="Deadline : 5:00 PM" />
          </Flex>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-2.5">
            <div className="mb-5 col-span-2">
              <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
                Name <Text color="red">*</Text>
              </Text>
              <CustomRadixInput placeholder="Enter Name" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-2.5">
            <div className="mb-5 col-span-2">
              <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
                Phone No. <Text color="red">*</Text>
              </Text>
              <CustomRadixInput placeholder="Enter Phone No." />
            </div>
          </div>

          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Focal Person Photos <Text color="red">*</Text>
            </Text>
            <div className="w-full sm:w-90 ">
              <UploadImagesForm />
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 gap-5 flex flex-wrap sm:flex-nowrap justify-center">
        <Badge
          radius="full"
          color="blue"
          className="font-bold! text-[17px]! py-2.25! px-3.5!"
        >
          2
        </Badge>
        <div className="w-full">
          <Flex justify="between" className="mb-5" wrap="wrap" gap="2">
            <CardHeader
              headingSize="5"
              heading="Setup Details"
              label="Update Setup Details"
            />
          </Flex>
          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Setup Location <Text color="red">*</Text>
            </Text>
            <div className="border border-dashed border-[#CBD5E1] p-4 rounded-4xl w-full sm:w-90 ">
              <Flex justify="center" className="mb-2.5">
                <Badge radius="full" color="green" className="p-3!">
                  <HugeiconsIcon size={24} icon={LocationShare02Icon} />
                </Badge>
              </Flex>

              <Text as="p" align="center" weight="bold" color="green" size="2">
                Click Here{" "}
                <Text className="text-slate-gray" weight="medium">
                  to Update your Location.
                </Text>
              </Text>
            </div>
          </div>

          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Setup Photos <Text color="red">*</Text>
            </Text>
            <div className="w-full sm:w-90 ">
              <UploadImagesForm description="Setup Photos" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 gap-5 flex flex-wrap sm:flex-nowrap justify-center">
        <Badge
          radius="full"
          color="blue"
          className="font-bold! text-[17px]! py-2.25! px-3.5!"
        >
          3
        </Badge>
        <div className="w-full">
          <Flex justify="between" className="mb-5" wrap="wrap" gap="2">
            <CardHeader
              headingSize="5"
              heading="Branding Details"
              label="Update Branding Details"
            />
          </Flex>
          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Appropriate Branding <Text color="red">*</Text>
            </Text>
            <YesNoRadio />
          </div>

          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Branding Photos <Text color="red">*</Text>
            </Text>
            <div className="w-full sm:w-90 ">
              <UploadImagesForm description="Branding Photos" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 gap-5 flex flex-wrap sm:flex-nowrap justify-center">
        <Badge
          radius="full"
          color="blue"
          className="font-bold! text-[17px]! py-2.25! px-3.5!"
        >
          4
        </Badge>
        <div className="w-full">
          <Flex justify="between" className="mb-5" wrap="wrap" gap="2">
            <CardHeader
              headingSize="5"
              heading="Regular Monitoring Checklist"
              label="Verify operational standards and compliance requirements"
            />
          </Flex>
          <Box>
            <Flex direction="column" className="gap-2.5">
              {checkLists?.map((checklist) => (
                <Flex align="center" className="gap-2.5 w-full!">
                  <Flex
                    align="center"
                    justify="between"
                    className="border-[1.5px] border-[#EFF0F2] py-2.5 ps-3 pe-7.5 rounded-[7px] w-full"
                    gap="4"
                  >
                    <CardHeader
                      headingSize="3"
                      headingWeight="medium"
                      labelSize="2"
                      gap="10px"
                      heading={checklist?.title}
                      label={checklist?.title}
                      icon={
                        <div className="p-3 bg-(--blue-9)/20 rounded-[10px]">
                          <Image
                            className="rounded-full"
                            src="/icons/clean.svg"
                            width={24}
                            height={24}
                            style={{ width: "24px", height: "24px" }}
                            alt="clean"
                          />
                        </div>
                      }
                    />

                    {checklist?.answerType === 1 ? (
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
                    ) : (
                      <MyRadioGroup
                        options={[
                          { label: "Yes", value: "yes" },
                          { label: "No", value: "no" },
                        ]}
                      />
                    )}
                  </Flex>
                  <div className="border border-dashed border-[#CBD5E1] py-3 px-4 rounded-[7px] w-full sm:w-90 ">
                    <Flex
                      align="center"
                      direction="column"
                      className="gap-1.75!"
                    >
                      <Text weight="bold" color="green" size="2">
                        Upload Photo
                      </Text>

                      <Text
                        weight="medium"
                        size="1"
                        className="text-slate-gray!"
                      >
                        JPG, PNG (Max 5MB)
                      </Text>
                    </Flex>
                  </div>
                </Flex>
              ))}

              {/* <Flex align="center" className="gap-2.5 w-full!">
                <Flex
                  align="center"
                  justify="between"
                  className="border-[1.5px] border-[#EFF0F2] py-2.5 ps-3 pe-7.5 rounded-[7px] w-full"
                  gap="4"
                >
                  <CardHeader
                    headingSize="3"
                    headingWeight="medium"
                    labelSize="2"
                    gap="10px"
                    heading="Logistic Arrangements"
                    label="Supply chain and distribution efficiency"
                    icon={
                      <div className="p-3 bg-(--purple-9)/20 rounded-[10px]">
                        <Image
                          className="rounded-full"
                          src="/icons/bus-03.svg"
                          width={24}
                          height={24}
                          style={{ width: "24px", height: "24px" }}
                          alt="bus-03"
                        />
                      </div>
                    }
                  />
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
                </Flex>
                <div className="border border-dashed border-[#CBD5E1] py-3 px-4 rounded-[7px] w-full sm:w-90 ">
                  <Flex align="center" direction="column" className="gap-1.75!">
                    <Text weight="bold" color="green" size="2">
                      Upload Photo
                    </Text>

                    <Text weight="medium" size="1" className="text-slate-gray!">
                      JPG, PNG (Max 5MB)
                    </Text>
                  </Flex>
                </div>
              </Flex>
              <Flex align="center" className="gap-2.5 w-full!">
                <Flex
                  align="center"
                  justify="between"
                  className="border-[1.5px] border-[#EFF0F2] py-2.5 ps-3 pe-7.5 rounded-[7px] w-full"
                  gap="4"
                >
                  <CardHeader
                    headingSize="3"
                    headingWeight="medium"
                    labelSize="2"
                    gap="10px"
                    heading="Electricity & Water Availability"
                    label="Essential utilities and infrastructure"
                    icon={
                      <div className="p-3 bg-(--iris-9)/20 rounded-[10px]">
                        <Image
                          className="rounded-full"
                          src="/icons/droplet.svg"
                          width={24}
                          height={24}
                          style={{ width: "24px", height: "24px" }}
                          alt="droplet"
                        />
                      </div>
                    }
                  />
                  <RadioGroup.Root defaultValue="1" name="example">
                    <MyRadioGroup
                      options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ]}
                    />
                  </RadioGroup.Root>
                </Flex>
                <div className="border border-dashed border-[#CBD5E1] py-3 px-4 rounded-[7px] w-full sm:w-90 ">
                  <Flex align="center" direction="column" className="gap-1.75!">
                    <Text weight="bold" color="green" size="2">
                      Upload Photo
                    </Text>

                    <Text weight="medium" size="1" className="text-slate-gray!">
                      JPG, PNG (Max 5MB)
                    </Text>
                  </Flex>
                </div>
              </Flex>
              <Flex align="center" className="gap-2.5 w-full!">
                <Flex
                  align="center"
                  justify="between"
                  className="border-[1.5px] border-[#EFF0F2] py-2.5 ps-3 pe-7.5 rounded-[7px] w-full"
                  gap="4"
                >
                  <CardHeader
                    headingSize="3"
                    headingWeight="medium"
                    labelSize="2"
                    gap="10px"
                    heading="Security Arrangements"
                    label="Safety protocols and personnel"
                    icon={
                      <div className="p-3 bg-(--iris-9)/20 rounded-[10px]">
                        <Image
                          className="rounded-full"
                          src="/icons/shield-02.svg"
                          width={24}
                          height={24}
                          style={{ width: "24px", height: "24px" }}
                          alt="shield-02"
                        />
                      </div>
                    }
                  />
                  <RadioGroup.Root defaultValue="1" name="example">
                    <MyRadioGroup
                      options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ]}
                    />
                  </RadioGroup.Root>
                </Flex>
                <div className="border border-dashed border-[#CBD5E1] py-3 px-4 rounded-[7px] w-full sm:w-90 ">
                  <Flex align="center" direction="column" className="gap-1.75!">
                    <Text weight="bold" color="green" size="2">
                      Upload Photo
                    </Text>

                    <Text weight="medium" size="1" className="text-slate-gray!">
                      JPG, PNG (Max 5MB)
                    </Text>
                  </Flex>
                </div>
              </Flex> */}
            </Flex>
          </Box>
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
      {/* <MCQ
            questionNumber={1}
            heading={"Daily Food Quality Check"}
            label={"Assess overall food quality and safety standards"}
            question={"Food Quality Satisfactory"}
          /> */}
    </>
  );
};

export default Setup;
