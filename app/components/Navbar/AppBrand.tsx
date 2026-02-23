import { Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const AppBrand = () => {
  return (
    <div className="font-quicksand">
      <Link href="/">
        <Flex
          className="gap-1 lg:gap-5.5"
          align="center"
          wrap="wrap"
          justify="center"
        >
          <Image
            src="/icons/logo-green.svg"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full w-7.5 h-7.5 lg:w-12.5 lg:h-12.5"
          />
          <Flex gap="0" direction="column">
            <Heading className="font-quicksand text-sm! lg:text-xl!">
              Ramzan Daster Khwan
            </Heading>
            <Text size="1" weight="medium">
              Monitoring & Evaluation System
            </Text>
          </Flex>
        </Flex>
      </Link>
    </div>
  );
};

export default AppBrand;
