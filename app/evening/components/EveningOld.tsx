import { Flex, Badge, Button, Text } from "@radix-ui/themes";
import { FaCircle } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import Image from "next/image";
import CustomLabel from "@/app/components/Form/CustomLabel";
import CustomRadixInput from "@/app/components/Form/CustomRadixInput";
import NavLinks from "@/app/components/Home/ShiftLinks";
import CardHeader from "@/app/components/Navbar/CardHeader";
import CommodityWiseSale from "./CommodityWiseSale/CommodityWiseSale";
import ShiftLinks from "@/app/components/Home/ShiftLinks";

const EveningOld = (userId: { userId: string }) => {
  return (
    <div className="card px-7.5 py-5 overflow-hidden">
      <Flex
        align="center"
        justify="between"
        className="px-7.5 py-0.75 -mx-7.5 -mt-5 bg-linear-to-b from-(--green-9) to-[#00783A] border-b border-medium-gray"
      >
        <CardHeader
          heading="Ramzan Nighebaan Bazaar"
          label="Inspection Form"
          headingColor="#fff"
          labelColor="#F1F1F1"
        />

        <Image
          src="/icons/maryam-moon.svg"
          alt="maryam-moon"
          width={95}
          height={84}
          className="w-23.75 h-auto"
        />
        {/* <Badge color="orange" className="py-3! px-6.5! rounded-[10px]!">
            <Flex align="center" className="gap-2.5!">
              <FaCircle className="text-(--orange-9)" size={9} />
              <Text size="3" className="font-semibold!">
                Deadline : 7:00 PM
              </Text>
            </Flex>
          </Badge> */}
      </Flex>
      <ShiftLinks />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-5 py-5">
        <div className="text-center">
          <Badge
            radius="full"
            color="green"
            className="font-bold! text-[17px]! py-2.25! px-3.5!"
          >
            1
          </Badge>
        </div>
        <Flex direction="column" className="gap-5 w-full">
          <CardHeader
            headingSize="5"
            labelWeight="regular"
            heading="Additional Details"
            label="Fill the feedback form"
          />

          <CustomLabel
            inputNode={
              <>
                <CustomRadixInput type="number" placeholder="Enter Football" />
              </>
            }
          >
            Football <Text color="red">*</Text>
          </CustomLabel>

          <CustomLabel
            inputNode={
              <>
                <CustomRadixInput
                  type="number"
                  placeholder="Enter Home Deliveries"
                />
              </>
            }
          >
            Home Deliveries <Text color="red">*</Text>
          </CustomLabel>
        </Flex>
        <div className="text-center md:text-end">
          <Badge color="orange" className="py-3! px-6.5! rounded-[10px]!">
            <Flex align="center" className="gap-2.5!">
              <FaCircle className="text-(--orange-9)" size={9} />
              <Text size="3" className="font-semibold!">
                Deadline : 06:00 PM
              </Text>
            </Flex>
          </Badge>
        </div>
      </div>
      <CommodityWiseSale />
      <div className="border-t border-medium-gray pt-3.75 -mx-7.5!">
        <Flex align="center" gap="2" justify="between" className="px-5!">
          <Flex align="center" gap="2">
            <div>
              <IoIosInformationCircle size={20} className="text-dark-gray" />
            </div>

            <Text size={{ initial: "1", sm: "2" }} weight="medium">
              All fields marked with <Text color="red">*</Text> are mandatory
            </Text>
          </Flex>
          <Button
            size={{ initial: "1", sm: "2" }}
            className="py-2.5! px-10! h-fit!"
            color="green"
          >
            Submit
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default EveningOld;
