import { Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const AppBrand = () => {
  return (
    <div className="font-quicksand">
      <Link href="/">
        <Flex className="gap-5.5" align="center" wrap="wrap" justify="center">
          <Image
            className="rounded-full"
            src="/icons/logo-green.svg"
            width={61}
            height={61}
            style={{ width: "61px", height: "61px" }}
            alt="logo"
          />
          <Flex gap="0" direction="column">
            <Heading size="6" className="font-quicksand">
              Ramzan Daster Khwan
            </Heading>
            <Text size="3" weight="medium">
              Monitoring & Evaluation System
            </Text>
          </Flex>
        </Flex>
      </Link>
    </div>
  );
};

export default AppBrand;
