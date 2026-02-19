"use client";
import { Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Form from "./components/Form";
import Header from "./components/Header";

const LoginPage = () => {
  return (
    <>
      <Header />

      <div className="fixed right-0 bottom-0 -z-10">
        <Image
          src="/images/maryam-nawaz.png"
          alt="maryam-nawaz"
          width={596}
          height={818} // intrinsic ratio preserved
          className="w-37.5 sm:w-50 md:w-87.5 lg:w-[45vw] xl:w-[35vw] 2xl:w-[26vw] h-auto drop-shadow-[0_20px_25px_rgba(255,255,255,.6)]"
        />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: "2",
        }}
      >
        <div className="flex justify-center">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] bg-blur-3 border border-[rgba(203,213,225,0.2)] rounded-[30px] px-5 py-2.5 md:px-7.5 md:py-3.75 lg:px-10 lg:py-5.5">
            {/* <div className="text-center" style={{ marginBottom: "20px" }}>
              <Image
                src="/icons/logo-white.svg"
                alt="logo"
                width={84}
                height={84}
                style={{ width: "84px", height: "84px" }}
                className="mx-auto"
              />
            </div> */}
            <Heading
              align="center"
              className="text-[15px]! sm:text-[20px]! lg:text-[22px]! xl:text-[32px]! text-white mb-4! lg:mb-8.5!"
            >
              Ramzan Dastarkhwan Bazaar
            </Heading>
            <Text
              as="p"
              className="text-white! text-xs! md:text-sm! xl:text-xl! mb-3! lg:mb-6.5!"
            >
              Enter your credential to continue
            </Text>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
