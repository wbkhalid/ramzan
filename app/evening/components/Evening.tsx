"use client";

import { SAHULAT_BAZAR_MONITORING_API } from "@/app/APIs";
import CustomLabel from "@/app/components/Form/CustomLabel";
import CustomRadixInput from "@/app/components/Form/CustomRadixInput";
import ErrorMessage from "@/app/components/Form/ErrorMessage";
import BazarLinks from "@/app/components/Home/BazarLinks";
import ShiftLinks from "@/app/components/Home/ShiftLinks";
import CardHeader from "@/app/components/Navbar/CardHeader";
import Spinner from "@/app/components/Spinner";
import useCommodities from "@/app/react-query/hooks/ramzan-monitoring/useCommodities";
import apiClient, { AxiosError } from "@/app/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import NumberFlow from "@number-flow/react";
import { Badge, Button, Flex, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaCircle } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { toast } from "sonner";
import z from "zod";

const commoditySaleSchema = z.object({
  commodityId: z
    .number({ error: "Please add commodity!" })
    .min(1, "Please add commodity!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add commodity!" }),
  quantitySold: z
    .number({ error: "Please add quantity sold!" })
    .min(1, "Please add quantity sold!")
    .optional(), // <-- allow undefined initially
  marketRate: z
    .number({ error: "Please add market rate!" })
    .min(1, "Please add market rate!")
    .optional(),
  bazarRate: z
    .number({ error: "Please add bazar rate!" })
    .min(1, "Please add bazar rate!")
    .optional(),
  totalMarketAmount: z
    .number({ error: "Please add total market amount!" })
    .min(0, "Please add total market amount!")
    .optional(),
  totalBazarAmount: z
    .number({ error: "Please add total bazar amount!" })
    .min(0, "Please add total bazar amount!")
    .optional(),
  savingAmount: z.number({ error: "Please add saving amount!" }).optional(),
});

const schema = z.object({
  bazarId: z
    .number({ error: "Please add bazar!" })
    .min(1, "Please add bazar!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add bazar!" }),
  monitoringDate: z.string().default(new Date().toISOString()),
  userId: z.string({ error: "Please add user!" }).min(1, "Please add user!"),
  footfall: z
    .number({ error: "Please add foot fall!" })
    .min(1, "Please add foot fall!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add foot fall!" }),
  totalComplaints: z
    .number({ error: "Please add total complaints!" })
    .min(1, "Please add total complaints!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add total complaints!" }),
  totalHomeDeliveries: z
    .number({ error: "Please add total home deliveries!" })
    .min(1, "Please add total home deliveries!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Please add total home deliveries!",
    }),
  commoditySales: z.array(commoditySaleSchema),
});

type EveningInput = z.input<typeof schema>;

interface Props {
  userId: string;
}

const Evening = ({ userId }: Props) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedBazarId, setSelectedBazarId] = useState<number>();

  const { data: commodities } = useCommodities();
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EveningInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId,
      commoditySales: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "commoditySales",
  });

  useEffect(() => {
    if (commodities && commodities.length > 0) {
      const mappedCommodities = commodities.map((commodity) => ({
        commodityId: commodity.id,
        marketRate: commodity.marketRate,
        bazarRate: commodity.bazarRate,
        quantitySold: undefined,
        totalMarketAmount: undefined,
        totalBazarAmount: undefined,
        savingAmount: undefined,
      }));

      replace(mappedCommodities); // important
    }
  }, [commodities, replace]);

  console.log("errors", errors);

  const resetFormState = () => {
    // Reset react-hook-form fields to default values
    reset({
      bazarId: 0,
      monitoringDate: new Date().toISOString(),
      userId,
      commoditySales: [],
    });
  };

  const onSubmit = async (formData: EveningInput) => {
    try {
      setSubmitting(true);

      // Submit the main form
      const res = await apiClient.post(
        SAHULAT_BAZAR_MONITORING_API + "/evening",
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

  const commoditySales = watch("commoditySales");

  useEffect(() => {
    fields.forEach((field, index) => {
      const quantity = watch(`commoditySales.${index}.quantitySold`) || 0;

      const totalMarket = quantity * (field.marketRate || 0);
      const totalBazar = quantity * (field.bazarRate || 0);
      const saving = totalMarket - totalBazar;

      setValue(`commoditySales.${index}.totalMarketAmount`, totalMarket);
      setValue(`commoditySales.${index}.totalBazarAmount`, totalBazar);
      setValue(`commoditySales.${index}.savingAmount`, saving);
    });
  }, [commoditySales]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="-mt-5 -mx-2 sm:-mx-10 lg:-mx-12.5 xl:-mx-25 mb-5">
          <BazarLinks
            userId={userId}
            setSelectedBazarId={setSelectedBazarId}
            selectedBazarId={selectedBazarId}
          />
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
                    <CustomRadixInput
                      {...register("footfall", { valueAsNumber: true })}
                      type="number"
                      placeholder="Enter Foot Fall"
                    />
                    <ErrorMessage>{errors.footfall?.message}</ErrorMessage>
                  </>
                }
              >
                Foot Fall <Text color="red">*</Text>
              </CustomLabel>

              <CustomLabel
                inputNode={
                  <>
                    <CustomRadixInput
                      {...register("totalComplaints", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      placeholder="Enter Complains"
                    />
                    <ErrorMessage>
                      {errors.totalComplaints?.message}
                    </ErrorMessage>
                  </>
                }
              >
                Complains <Text color="red">*</Text>
              </CustomLabel>

              <CustomLabel
                inputNode={
                  <>
                    <CustomRadixInput
                      {...register("totalHomeDeliveries", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      placeholder="Enter Home Deliveries"
                    />
                    <ErrorMessage>
                      {errors.totalHomeDeliveries?.message}
                    </ErrorMessage>
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
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[auto_1fr] gap-5 py-5">
            <div className="text-center">
              <Badge
                radius="full"
                color="green"
                className="font-bold! text-[17px]! py-2.25! px-3.5!"
              >
                2
              </Badge>
            </div>
            <Flex direction="column" className="gap-5 w-full">
              <CardHeader
                headingSize="5"
                labelWeight="regular"
                heading="Commodity wise Sale"
                label="Fill the Commodity wise Sale"
              />

              {fields.map((field, index) => {
                const commodity = commodities?.find(
                  (c) => c.id === field.commodityId,
                );

                const quantity =
                  watch(`commoditySales.${index}.quantitySold`) || 0;

                const totalMarket = quantity * (field.marketRate || 0);
                const totalBazar = quantity * (field.bazarRate || 0);
                const saving = totalMarket - totalBazar;

                return (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6  gap-6 mb-6"
                  >
                    {/* Hidden CommodityId */}
                    <input
                      type="hidden"
                      {...register(`commoditySales.${index}.commodityId`)}
                    />

                    {/* Quantity Input */}
                    <CustomLabel
                      inputNode={
                        <>
                          <CustomRadixInput
                            type="number"
                            placeholder={`Enter ${commodity?.name}`}
                            {...register(
                              `commoditySales.${index}.quantitySold`,
                              { valueAsNumber: true },
                            )}
                          >
                            <TextField.Slot side="right">KG</TextField.Slot>
                          </CustomRadixInput>
                          <ErrorMessage>
                            {
                              errors.commoditySales?.[index]?.quantitySold
                                ?.message
                            }
                          </ErrorMessage>
                        </>
                      }
                    >
                      {commodity?.name} <Text color="red">*</Text>
                    </CustomLabel>

                    {/* Market Rate */}
                    <CustomLabel
                      inputNode={
                        <Text
                          as="p"
                          weight="medium"
                          size="3"
                          className="py-3.25 text-slate-gray"
                        >
                          {field.marketRate} Rs/-
                        </Text>
                      }
                    >
                      Market Rate
                    </CustomLabel>

                    {/* Bazar Rate */}
                    <CustomLabel
                      inputNode={
                        <Text
                          as="p"
                          weight="medium"
                          size="3"
                          className="py-3.25 text-slate-gray"
                        >
                          {field.bazarRate} Rs/-
                        </Text>
                      }
                    >
                      Bazar Rate
                    </CustomLabel>

                    {/* Total Market */}
                    <CustomLabel
                      inputNode={
                        <Text
                          as="p"
                          weight="medium"
                          size="3"
                          className="py-3.25 text-slate-gray"
                        >
                          <NumberFlow value={totalMarket} /> Rs/-
                        </Text>
                      }
                    >
                      Total Market
                    </CustomLabel>

                    {/* Total Bazar */}
                    <CustomLabel
                      inputNode={
                        <Text
                          as="p"
                          weight="medium"
                          size="3"
                          className="py-3.25 text-slate-gray"
                        >
                          <NumberFlow value={totalBazar} /> Rs/-
                        </Text>
                      }
                    >
                      Total Bazar
                    </CustomLabel>

                    {/* Saving */}
                    <CustomLabel
                      inputNode={
                        <Text
                          as="p"
                          weight="medium"
                          size="3"
                          className="py-3.25"
                          color="green"
                        >
                          {<NumberFlow value={saving} />} Rs/-
                        </Text>
                      }
                    >
                      Saving
                    </CustomLabel>
                  </div>
                );
              })}
            </Flex>
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

export default Evening;
