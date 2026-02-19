import { Flex, Heading } from "@radix-ui/themes";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full">
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Image
            className="rounded-full h-auto w-10 sm:w-20 md:w-24 lg:w-28 xl:w-33"
            src="/icons/logo-green.svg"
            width={132}
            height={106}
            alt="logo"
          />
          <Flex direction="column" gap="0">
            <Heading className="text-[#066737]! text-sm! sm:text-lg! md:text-[1.5rem]! lg:text-[1.8rem]! xl:text-[2rem]!">
              Food Safety & Consumer
            </Heading>
            <Heading className="text-[#066737]! text-sm! sm:text-lg! md:text-[1.5rem]! lg:text-[1.8rem]! xl:text-[2rem]!">
              Protection Department
            </Heading>
          </Flex>
        </Flex>
        <Image
          className="rounded-full h-auto w-10 sm:w-20 md:w-24 lg:w-28 xl:w-30.25"
          src="/icons/pfa-logo.svg"
          width={121}
          height={98}
          alt="logo"
        />
      </Flex>
    </div>
  );
};

export default Header;
