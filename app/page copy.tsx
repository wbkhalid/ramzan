import { Badge, Box, CheckboxCards, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import MCQ from "./components/Home/MCQ";
import CardHeader from "./components/Navbar/CardHeader";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-2.5">
        <div className="col-span-2 card px-7.5 py-5">
          <Flex align="center" justify="between" className="mb-5!">
            <CardHeader
              heading="Daily Data Submission"
              label="Complete all mandatory fields for Day 1 - Feb 19, 2026"
            />

            <Badge color="orange" className="py-3! px-6.5! rounded-[10px]!">
              <Flex align="center" className="gap-2.5!">
                <FaCircle className="text-(--orange-9)" size={9} />
                <Text size="3" className="font-semibold!">
                  Deadline : 7:00 PM
                </Text>
              </Flex>
            </Badge>
          </Flex>
          <div className="border-t border-medium-gray -mx-7.5"></div>
          <MCQ
            questionNumber={1}
            heading={"Daily Food Quality Check"}
            label={"Assess overall food quality and safety standards"}
            question={"Food Quality Satisfactory"}
          />

          <Flex className="py-5 gap-5">
            <Badge
              radius="full"
              color="blue"
              className="font-bold! text-[17px]! py-2.25! px-3.5!"
            >
              2
            </Badge>
            <div className="w-full">
              <div className="mb-5">
                <CardHeader
                  headingSize="5"
                  heading="Regular Monitoring Checklist"
                  label="Verify operational standards and compliance requirements"
                />
              </div>
              <Box>
                <CheckboxCards.Root
                  color="blue"
                  defaultValue={["1"]}
                  columns={{ initial: "1", sm: "1" }}
                  className="[&_button]:scale-150! gap-2.5!"
                >
                  <CheckboxCards.Item
                    value="1"
                    className="[--checkbox-cards-item-border-width:0]! py-2.5! px-3! shadow-[0px_0px_0px_1.5px_var(--color-medium-gray)]!"
                  >
                    <CardHeader
                      headingSize="3"
                      headingWeight="medium"
                      labelSize="2"
                      gap="10px"
                      heading="Cleanliness & Waste Management"
                      label="Hygiene standards and waste disposal"
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
                  </CheckboxCards.Item>
                  <CheckboxCards.Item
                    value="1"
                    className="[--checkbox-cards-item-border-width:0]! py-2.5! px-3! shadow-[0px_0px_0px_1.5px_var(--color-medium-gray)]!"
                  >
                    <CardHeader
                      headingSize="3"
                      headingWeight="medium"
                      gap="10px"
                      labelSize="2"
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
                            alt="bus"
                          />
                        </div>
                      }
                    />
                  </CheckboxCards.Item>
                  <CheckboxCards.Item
                    value="1"
                    className="[--checkbox-cards-item-border-width:0]! py-2.5! px-3! shadow-[0px_0px_0px_1.5px_var(--color-medium-gray)]!"
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
                  </CheckboxCards.Item>
                  <CheckboxCards.Item
                    value="1"
                    className="[--checkbox-cards-item-border-width:0]! py-2.5! px-3! shadow-[0px_0px_0px_1.5px_var(--color-medium-gray)]!"
                  >
                    <CardHeader
                      headingSize="3"
                      headingWeight="medium"
                      labelSize="2"
                      gap="10px"
                      heading="Security Arrangements"
                      label="Safety protocols and personnel"
                      icon={
                        <div className="p-3 bg-(--red-9)/20 rounded-[10px]">
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
                  </CheckboxCards.Item>
                </CheckboxCards.Root>
              </Box>
            </div>
          </Flex>

          <MCQ
            questionNumber={3}
            heading={"Food Receipt Status"}
            label={"Assess overall food quality and safety standards"}
            question={"Food Quality Satisfactory"}
          />
        </div>
        <div className="card px-7.5 py-5">left</div>
      </div>
    </>
  );
}
