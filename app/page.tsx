"use client";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import DailyUserInspectionForm from "./components/Home/DailyUserInspectionForm";
import Setup from "./components/Home/Steps/StepOne/Setup";
import Feedback from "./components/Home/Steps/StepThree/Feedback";
import Food from "./components/Home/Steps/StepTwo/Food";
import CardHeader from "./components/Navbar/CardHeader";

export default function Home() {
  const [stepNo, setStepNo] = useState<number>(0);

  const steps = [
    {
      label: "Setup",
    },
    {
      label: "Food",
    },
    {
      label: "Feedback",
    },
  ];

  return (
    <>
      {stepNo > 0 && (
        <>
          <Image
            src="/images/banner.png"
            alt="banner"
            width={1242}
            height={188}
            className="w-full h-auto mb-5"
          />
          <div className="card px-7.5 py-5 overflow-hidden">
            <Flex
              align="center"
              justify="between"
              className="px-7.5 py-0.75 -mx-7.5 -my-5 bg-linear-to-b from-[#008D44] to-[#00783A] border-b border-medium-gray"
            >
              <CardHeader
                heading="Daily Data Submission"
                label="Complete all mandatory fields for Day 1 - Feb 19, 2026"
                headingColor="#fff"
                labelColor="#F1F1F1"
              />

              <Image
                src="/images/ramzan-badge.png"
                alt="ramzan-badge"
                width={127}
                height={79}
                className="w-31.75 h-19.75"
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
            <div className="py-3.75">
              <div className="mt-3">
                <Flex gap="2" justify="center">
                  {steps.map((d, i) => (
                    <Button
                      color="green"
                      variant={stepNo === i + 1 ? "solid" : "soft"}
                      key={i + 1}
                      onClick={() => setStepNo(i + 1)}
                    >
                      Step {i + 1}: {d.label}
                    </Button>
                  ))}
                </Flex>
              </div>
              {stepNo === 1 && <Setup setStepNo={setStepNo} />}
              {stepNo === 2 && <Food />}
              {stepNo === 3 && <Feedback />}
            </div>

            {/* <MCQ
          questionNumber={3}
          heading={"Food Receipt Status"}
          label={"Assess overall food quality and safety standards"}
          question={"Food Quality Satisfactory"}
        /> */}
          </div>
        </>
      )}
      {stepNo === 0 && (
        <div
          style={{
            position: "relative",
            zIndex: "2",
          }}
        >
          <div className="flex justify-center">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-white rounded-[23px] px-5 md:p-7.5 lg:p-7.5">
              <div className="mb-5">
                <Heading align="center" className="text-[20px] text-dark!">
                  Daily User Inspection
                </Heading>
                <Text
                  as="p"
                  align="center"
                  size="3"
                  className="text-slate-gray!"
                >
                  Update these field
                </Text>
              </div>
              <DailyUserInspectionForm setStepNo={setStepNo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
