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
            width={50}
            height={50}
            style={{ width: "50px", height: "50px" }}
            alt="logo"
          />
          <Flex gap="0" direction="column">
            <Heading size="4" className="font-quicksand">
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
