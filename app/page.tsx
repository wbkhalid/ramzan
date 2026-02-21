"use client";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import DailyUserInspectionForm from "./components/Home/DailyUserInspectionForm";
import Setup from "./components/Home/Steps/StepOne/Setup";
import Feedback from "./components/Home/Steps/StepThree/Feedback";
import Food from "./components/Home/Steps/StepTwo/Food";
import CardHeader from "./components/Navbar/CardHeader";
import useStepsStatus from "./react-query/hooks/ramzan-monitoring/useStepsStatus";
import Cookies from "js-cookie";

export default function Home() {
  const [stepNo, setStepNo] = useState<number>(0);
  const todayDate = new Date().toISOString().split("T")[0];
  const dastarkhawanId = Cookies.get("dastarkhawanId");

  const parsedDastarkhawanId = dastarkhawanId ? Number(dastarkhawanId) : 0;

  const { data, refetch } = useStepsStatus(parsedDastarkhawanId, todayDate);

  const startDate = new Date("2026-02-19");

  const today = new Date();

  // Calculate difference in days
  const diffTime = today.getTime() - startDate.getTime();
  const dayNumber = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

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
          <div className="card px-3 md:px-7.5 py-5 overflow-hidden">
            <Flex
              align="center"
              justify="between"
              className="px-7.5 py-0.75 -mx-7.5 -my-5 bg-linear-to-b from-[#008D44] to-[#00783A] border-b border-medium-gray"
            >
              <CardHeader
                heading="Daily Data Submission"
                label={`Complete all mandatory fields for Day ${dayNumber} - ${today.toDateString()}`}
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
              <div className="my-3">
                <Flex gap="2" justify="center">
                  {steps.map((d, i) => (
                    <Button
                      color="green"
                      variant={stepNo === i + 1 ? "solid" : "soft"}
                      key={i + 1}
                      onClick={() => setStepNo(i + 1)}
                      disabled={
                        (i === 1 && !data?.step1Completed) ||
                        (i === 2 && !data?.step2Completed)
                      }
                    >
                      Step {i + 1}: {d.label}
                    </Button>
                  ))}
                </Flex>
              </div>
              {stepNo === 1 && (
                <Setup
                  setStepNo={setStepNo}
                  stepCompleted={data?.step1Completed ?? false}
                  refetchStepsStatus={refetch}
                />
              )}
              {stepNo === 2 && (
                <Food
                  setStepNo={setStepNo}
                  stepCompleted={data?.step2Completed ?? false}
                  refetchStepsStatus={refetch}
                />
              )}
              {stepNo === 3 && (
                <Feedback
                  setStepNo={setStepNo}
                  stepCompleted={data?.step3Completed ?? false}
                  refetchStepsStatus={refetch}
                />
              )}
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
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-white rounded-[23px] px-5 md:p-7.5 lg:p-7.5 max-h-[80dvh] overflow-y-scroll">
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
              <DailyUserInspectionForm
                setStepNo={setStepNo}
                stepCompleted={data?.step0Completed ?? false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
