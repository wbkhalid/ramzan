"use client";

import { Flex, Badge, Button, Text, ScrollArea } from "@radix-ui/themes";
import { FaCircle } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import CustomLabel from "../Form/CustomLabel";
import CustomRadixInput from "../Form/CustomRadixInput";
import CardHeader from "../Navbar/CardHeader";
import ShiftLinks from "./ShiftLinks";
import Image from "next/image";
import z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import apiClient, { AxiosError } from "@/app/services/api-client";
import { SAHULAT_BAZAR_MONITORING_API } from "@/app/APIs";
import useStalls from "@/app/react-query/hooks/ramzan-monitoring/useStalls";
import ErrorMessage from "../Form/ErrorMessage";
import BazarLinks from "./BazarLinks";
import Spinner from "../Spinner";

const stallEntrySchema = z.object({
  stallCategoryId: z
    .number({ error: "Please add stall!" })
    .min(1, "Please add stall!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add stall!" }),
  stallCount: z
    .number({ error: "Please add stall count!" })
    .min(1, "Please add stall count!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add stall count!" }),
});

const schema = z.object({
  bazarId: z
    .number({ error: "Please add bazar!" })
    .min(1, "Please add bazar!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add bazar!" }),
  monitoringDate: z.string().default(new Date().toISOString()),
  userId: z.string({ error: "Please add user!" }).min(1, "Please add user!"),
  staffMembers: z
    .number({ error: "Please add staff members!" })
    .min(1, "Please add staff members!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add staff members!" }),
  stallEntries: z.array(stallEntrySchema),
});

type MorningInput = z.input<typeof schema>;

interface Props {
  userId: string;
}

const Morning = ({ userId }: Props) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedBazarId, setSelectedBazarId] = useState<number>();

  const { data: stalls } = useStalls();
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<MorningInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId,
      stallEntries: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "stallEntries",
  });

  useEffect(() => {
    if (stalls && stalls.length > 0) {
      const mappedStalls = stalls.map((stall) => ({
        stallCategoryId: stall.id,
        stallCount: 0,
      }));

      replace(mappedStalls); // important
    }
  }, [stalls, replace]);

  console.log("errors", errors);

  const resetFormState = () => {
    // Reset react-hook-form fields to default values
    reset({
      bazarId: 0,
      monitoringDate: new Date().toISOString(),
      userId,
      staffMembers: 0,
      stallEntries: [],
    });
  };

  const onSubmit = async (formData: MorningInput) => {
    try {
      setSubmitting(true);

      // Submit the main form
      const res = await apiClient.post(
        SAHULAT_BAZAR_MONITORING_API + "/morning",
        formData,
      );
      console.log("res", res);
      console.log("res.data.data", res.data.data);

      // ✅ Only reset on successful submission
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        resetFormState(); // Reset all form fields and state
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (err) {
      console.log("err", err);
      toast.error((err as AxiosError).message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (selectedBazarId) {
      setValue("bazarId", selectedBazarId);
    }
  }, [selectedBazarId]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="-mt-5 -mx-2 sm:-mx-10 lg:-mx-12.5 xl:-mx-25 mb-5">
          <ScrollArea type="auto" scrollbars="horizontal">
            <BazarLinks
              userId={userId}
              setSelectedBazarId={setSelectedBazarId}
              selectedBazarId={selectedBazarId}
            />
          </ScrollArea>
        </div>
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
          <div className="border-b border-[#E2E1E2] -mx-7.5"></div>
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
                heading="Morning Arrangements"
                label="Update all the morning arrangements"
              />

              <CustomLabel
                inputNode={
                  <>
                    <CustomRadixInput
                      {...register("staffMembers", { valueAsNumber: true })}
                      type="number"
                      placeholder="Enter Staff Member"
                    />
                    <ErrorMessage>{errors.staffMembers?.message}</ErrorMessage>
                  </>
                }
              >
                Staff Member <Text color="red">*</Text>
              </CustomLabel>

              <CardHeader
                headingSize="5"
                labelWeight="regular"
                heading="Stall Details"
                label="Enter all the stall Details"
              />

              {fields.map((field, index) => {
                const stall = stalls?.find(
                  (s) => s.id === field.stallCategoryId,
                );

                return (
                  <CustomLabel
                    key={field.id}
                    inputNode={
                      <>
                        <CustomRadixInput
                          type="number"
                          placeholder={`Enter ${stall?.name}`}
                          {...register(`stallEntries.${index}.stallCount`, {
                            valueAsNumber: true,
                          })}
                        />
                        <ErrorMessage>
                          {errors.stallEntries?.[index]?.stallCount?.message}
                        </ErrorMessage>
                      </>
                    }
                  >
                    {stall?.name} <Text color="red">*</Text>
                  </CustomLabel>
                );
              })}
            </Flex>
            <div className="text-center md:text-end">
              <Badge color="orange" className="py-3! px-6.5! rounded-[10px]!">
                <Flex align="center" className="gap-2.5!">
                  <FaCircle className="text-(--orange-9)" size={9} />
                  <Text size="3" className="font-semibold!">
                    Deadline : 10:00 AM
                  </Text>
                </Flex>
              </Badge>
            </div>
          </div>
          <div className="border-t border-medium-gray pt-3.75 -mx-7.5!">
            <Flex align="center" gap="2" justify="between" className="px-5!">
              <Flex align="center" gap="2">
                <IoIosInformationCircle size={20} className="text-dark-gray" />

                <Text size="2" weight="medium">
                  All fields marked with <Text color="red">*</Text> are
                  mandatory
                </Text>
              </Flex>
              <Button
                type="submit"
                className="py-2.5! px-10! h-fit!"
                color="green"
                disabled={isSubmitting}
              >
                Submit {isSubmitting && <Spinner />}
              </Button>
            </Flex>
          </div>
        </div>
      </form>
    </>
  );
};

export default Morning;
