"use client";
import { Heading } from "@radix-ui/themes";
import Image from "next/image";
import Form from "./components/Form";

const LoginPage = () => {
  return (
    <div>
      {/* Overlay */}
      {/* <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.65)]"
        style={{ zIndex: 1 }}
      /> */}
      {/* content */}
      <div
        style={{
          position: "relative",
          zIndex: "2",
        }}
      >
        <div className="flex justify-center">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] md:w-8/12 lg:w-135 bg-blur-3 border border-[rgba(203,213,225,0.2)] rounded-[30px] px-7.5 py-18.25">
            <div className="text-center" style={{ marginBottom: "20px" }}>
              <Image
                src="/icons/logo-white.svg"
                alt="logo"
                width={84}
                height={84}
                style={{ width: "84px", height: "84px" }}
                className="mx-auto"
              />
            </div>
            <div className="row m-0">
              <div className="col text-center">
                <Heading size="6" className="text-white fw-6 font-bold! mb-5">
                  Ramzan Dastar Khwan
                </Heading>
              </div>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
