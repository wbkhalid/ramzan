"use client";

import { SAHULAT_BAZAR_API } from "@/app/APIs";
import CustomSelect, {
  defaultOption,
  OptionType,
} from "@/app/components/Form/CustomSelect";
import ErrorMessage from "@/app/components/Form/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { customSingleSelectStyles } from "@/app/login/components/Form";
import UploadImagesForm, {
  UploadedFile,
  UploadImagesFormHandle,
} from "@/app/new-location/components/UploadImagesForm";
import apiClient from "@/app/services/api-client";
import {
  District,
  Division,
  SAHULAT_BAZAR_ENUM,
  sahulatBazarOptions,
  TehsilLookup,
} from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Heading,
  RadioCards,
  Text,
  TextField,
} from "@radix-ui/themes";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { toast } from "sonner";
import z from "zod";
import MapDialog from "./MyMap/MapDialog";
import useSahulatBazarLocations from "@/app/react-query/hooks/ramzan-monitoring/useSahulatBazarLocations";

const locationPictures = z.object({
  pathUrl: z.string().min(1, { message: "Please add recommended!" }),
});

const schema = z.object({
  id: z
    .number({ error: "Please add Bazar!" })
    .min(1, "Please add Bazar!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add Bazar!" }),
  name: z.string().min(1, { message: "Please add name!" }),
  personName: z.string().min(1, { message: "Please add person name!" }),
  designation: z.string().min(1, { message: "Please add designation name!" }),
  phoneNumber: z.string().min(1, { message: "Please add phone no.!" }),
  divisionId: z
    .number({ error: "Please add division!" })
    .min(1, "Please add division!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add division!" }),
  districtId: z
    .number({ error: "Please add district!" })
    .min(1, "Please add district!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add district!" }),
  tehsilId: z
    .number({ error: "Please add tehsil!" })
    .min(1, "Please add tehsil!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add tehsil!" }),
  latitude: z
    .number({ error: "Please add latitude!" })
    .min(1, "Please add latitude!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add latitude!" }),
  longitude: z
    .number({ error: "Please add longitude!" })
    .min(1, "Please add longitude!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add longitude!" }),
  recommended: z.boolean().default(true),
  remarks: z.string().min(1, { message: "Please add remarks!" }),
  type: z
    .number({ error: "Please add type!" })
    .default(SAHULAT_BAZAR_ENUM.SAHULAT_BAZAR),
  userId: z.string().min(1, { message: "Please add user!" }),
  locationPictures: z
    .array(locationPictures)
    .refine((val) => val.length >= 1, {
      message: "Please add at least one image!",
    })
    .optional(),
});

export type UpdateLocation = z.infer<typeof schema>;
type UpdateLocationInput = z.input<typeof schema>;

interface Props {
  divisionResponse: Division;
  districtResponse: District;
  tehsilsData: TehsilLookup[];
  userId: string;
}

const Form = ({
  divisionResponse,
  districtResponse,
  tehsilsData,
  userId,
}: Props) => {
  const [locationPictures, setLocationPictures] = useState<UploadedFile[]>([]);
  const uploadFormRef = useRef<UploadImagesFormHandle>(null);

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateLocationInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId,
      recommended: true,
      divisionId: divisionResponse.id,
      districtId: districtResponse.id,
    },
  });

  console.log("errors", errors);

  const divisionOption: OptionType = {
    label: divisionResponse.name,
    value: divisionResponse.id.toString(),
  };

  const districtOption: OptionType = {
    label: districtResponse.name,
    value: districtResponse.id.toString(),
  };

  const tehsilOptions: OptionType[] | undefined = tehsilsData.map((d) => {
    return {
      label: d.name,
      value: d.id.toString(),
    };
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const selectedTehsilId = watch("tehsilId");
  const selectedId = watch("id");

  const {
    data: dastarKhwanLocations,
    isLoading,
    isFetching,
  } = useSahulatBazarLocations(selectedTehsilId);

  useEffect(() => {
    console.log("selectedTehsilId", selectedTehsilId);
    console.log("dastarKhwanLocations", dastarKhwanLocations);
  }, [selectedTehsilId, dastarKhwanLocations]);

  const dastarKhwanLocationOptions: OptionType[] =
    dastarKhwanLocations?.map((location) => ({
      value: location.id.toString(),
      label: location.name,
    })) || [];

  useEffect(() => {
    if (!selectedId || !dastarKhwanLocations?.length) return;

    const selectedLocation = dastarKhwanLocations.find(
      (loc) => loc.id === selectedId,
    );

    if (!selectedLocation) {
      return;
    }

    // Prefill ONLY if values exist
    if (selectedLocation.latitude != null) {
      setValue("latitude", selectedLocation.latitude, {
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue("longitude", selectedLocation.longitude, {
        shouldDirty: false,
        shouldTouch: false,
      });

      setValue("personName", selectedLocation.personName, {
        shouldDirty: false,
        shouldTouch: false,
      });

      setValue("designation", selectedLocation.designation, {
        shouldDirty: false,
        shouldTouch: false,
      });

      setValue("phoneNumber", selectedLocation.phoneNumber, {
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [selectedId, dastarKhwanLocations, setValue]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setValue("latitude", lat);
    setValue("longitude", lng);
  };

  // ✅ Helper function to reset all form state
  const resetFormState = () => {
    // Reset react-hook-form fields to default values
    reset({
      id: 0,
      name: "",
      personName: "",
      designation: "",
      phoneNumber: "",
      divisionId: 0,
      districtId: 0,
      tehsilId: 0,
      latitude: 0,
      longitude: 0,
      recommended: true,
      remarks: "",
      type: 0,
      userId,
    });

    // Reset useState for location pictures
    setLocationPictures([]);

    // Reset upload form component
    uploadFormRef.current?.clearUploadedFiles?.();
  };

  const onSubmit = async (formData: UpdateLocationInput) => {
    try {
      setSubmitting(true);

      // Get uploaded files from ref
      const uploadedFiles = uploadFormRef.current?.getUploadedFiles();

      if (!uploadedFiles || uploadedFiles.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      // Add uploaded file paths to form data
      const updatedFormData = {
        ...formData,
        locationPictures: uploadedFiles.map((file) => ({
          pathUrl: file.fileUrl,
        })),
      };

      console.log("updatedFormData", updatedFormData);
      // Submit the main form
      const res = await apiClient.post(
        SAHULAT_BAZAR_API + "/update-location-details",
        updatedFormData,
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

  return (
    <>
      <div className="row m-0">
        <div className="col text-center">
          <Heading
            align="center"
            className="text-[15px]! sm:text-[20px]! lg:text-[22px]! xl:text-[32px]! text-white mb-4! lg:mb-8.5!"
          >
            Ramzan Nighebaan Bazaar
          </Heading>
          <Text
            as="p"
            align="left"
            className="text-white! text-xs! md:text-sm! xl:text-xl! mb-3! lg:mb-6.5!"
          >
            Enter all data to continue
          </Text>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2! xl:gap-8! mb-5">
          <label>
            <Text
              as="p"
              mb="1"
              weight="bold"
              className="text-white! text-[13px]!"
            >
              Person Incharge Name <Text color="red">*</Text>
            </Text>
            <TextField.Root
              {...register("personName")}
              placeholder="Enter Incharge Name"
              size="3"
              className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-fit! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
              autoComplete="on"
            />
            <ErrorMessage varient="1">
              {errors.personName?.message}
            </ErrorMessage>
          </label>

          <label>
            <Text
              as="p"
              mb="1"
              weight="bold"
              className="text-white! text-[13px]!"
            >
              Designation <Text color="red">*</Text>
            </Text>
            <TextField.Root
              {...register("designation")}
              placeholder="Enter Designation"
              size="3"
              className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-fit! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
              autoComplete="on"
            />
            <ErrorMessage varient="1">
              {errors.designation?.message}
            </ErrorMessage>
          </label>

          <label>
            <Text
              as="p"
              mb="1"
              weight="bold"
              className="text-white! text-[13px]!"
            >
              Phone No <Text color="red">*</Text>
            </Text>
            <TextField.Root
              {...register("phoneNumber")}
              placeholder="Enter Phone no."
              size="3"
              className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-fit! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
              autoComplete="on"
            />
            <ErrorMessage varient="1">
              {errors.phoneNumber?.message}
            </ErrorMessage>
          </label>

          <label>
            <Text
              as="p"
              mb="1"
              weight="bold"
              className="text-white! text-[13px]!"
            >
              Division
            </Text>

            <CustomSelect
              singleSelectStyles={customSingleSelectStyles}
              closeMenuOnSelect={true}
              options={[divisionOption]}
              isDisabled
              defaultValue={divisionOption}
            />
          </label>

          <label>
            <Text
              as="p"
              mb="1"
              weight="bold"
              className="text-white! text-[13px]!"
            >
              District
            </Text>

            <CustomSelect
              singleSelectStyles={customSingleSelectStyles}
              closeMenuOnSelect={true}
              options={[districtOption]}
              isDisabled
              defaultValue={districtOption}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold" className="text-white">
              Tehsil <Text color="red">*</Text>
            </Text>
            <Controller
              name="tehsilId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={[defaultOption, ...tehsilOptions]}
                  closeMenuOnSelect
                  singleSelectStyles={customSingleSelectStyles}
                  value={
                    tehsilOptions.find(
                      (opt) =>
                        opt.value ===
                        (field.value != null ? field.value.toString() : ""),
                    )
                      ? [
                          tehsilOptions.find(
                            (opt) =>
                              opt.value ===
                              (field.value != null
                                ? field.value.toString()
                                : ""),
                          )!,
                        ]
                      : null
                  }
                  onChangeSingle={(selectedOption) => {
                    field.onChange(
                      selectedOption ? Number(selectedOption.value) : null,
                    );
                  }}
                />
              )}
            />

            <ErrorMessage varient="1">{errors.tehsilId?.message}</ErrorMessage>
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold" className="text-white">
              Bazaar Name <Text color="red">*</Text>
            </Text>
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  singleSelectStyles={customSingleSelectStyles}
                  options={
                    isLoading
                      ? [{ label: "Loading...", value: "" }]
                      : dastarKhwanLocationOptions
                  }
                  closeMenuOnSelect
                  value={
                    dastarKhwanLocationOptions.find(
                      (opt) =>
                        opt.value ===
                        (field.value != null ? field.value.toString() : ""),
                    )
                      ? [
                          dastarKhwanLocationOptions.find(
                            (opt) =>
                              opt.value ===
                              (field.value != null
                                ? field.value.toString()
                                : ""),
                          )!,
                        ]
                      : null
                  }
                  onChangeSingle={(selectedOption) => {
                    field.onChange(
                      selectedOption ? Number(selectedOption.value) : null,
                    );
                    if (selectedOption) setValue("name", selectedOption.label);
                  }}
                />
              )}
            />
            <ErrorMessage varient="1">{errors.id?.message}</ErrorMessage>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold" className="text-white">
              Type <Text color="red">*</Text>
            </Text>
            <Controller
              name="type"
              control={control}
              defaultValue={Number(sahulatBazarOptions[0].value)} // ← important
              render={({ field }) => {
                const selectedOption = sahulatBazarOptions.find(
                  (opt) => opt.value === field.value?.toString(),
                );

                return (
                  <CustomSelect
                    {...field}
                    options={sahulatBazarOptions}
                    closeMenuOnSelect
                    singleSelectStyles={customSingleSelectStyles}
                    value={selectedOption || null} // ← pass object, not array
                    onChangeSingle={(option) => {
                      field.onChange(option ? Number(option.value) : null);
                    }}
                  />
                );
              }}
            />

            <ErrorMessage varient="1">{errors.type?.message}</ErrorMessage>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-2! xl:gap-8! mb-5 items-start">
          <div className="col-span-1 md:col-span-2">
            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-white! text-[13px]!"
              >
                Latitude <Text color="red">*</Text>
              </Text>
              <TextField.Root
                type="number"
                step="any"
                {...register("latitude", { valueAsNumber: true })}
                placeholder="Latitude"
                size="3"
                className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-fit! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
                autoComplete="on"
              />
              <ErrorMessage varient="1">
                {errors.latitude?.message}
              </ErrorMessage>
            </label>
          </div>
          <div className="col-span-1 md:col-span-2">
            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-white! text-[13px]!"
              >
                Longituge <Text color="red">*</Text>
              </Text>
              <TextField.Root
                type="number"
                step="any"
                {...register("longitude", { valueAsNumber: true })}
                placeholder="Longitude"
                size="3"
                className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-fit! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
                autoComplete="on"
              />
              <ErrorMessage varient="1">
                {errors.longitude?.message}
              </ErrorMessage>
            </label>
          </div>

          <label>
            <Text
              as="p"
              mb="1"
              weight="bold"
              className="text-white! text-[13px]!"
            >
              &nbsp;
            </Text>
            <MapDialog onLocationSelect={handleLocationSelect} />
          </label>

          <div className="col-span-1 md:col-span-5">
            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-white! text-[13px]!"
              >
                Recommended
              </Text>

              <Controller
                name="recommended"
                control={control}
                render={({ field }) => (
                  <RadioCards.Root
                    color="green"
                    columns="2"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <RadioCards.Item
                      value="yes"
                      className="py-2.5! px-3! w-full!"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Flex align="center" gap="2">
                        {field.value ? (
                          <FaCircle className="text-(--green-9)" />
                        ) : (
                          <FaRegCircle className="text-medium-gray" />
                        )}
                        <Text weight="medium" size="2">
                          Yes
                        </Text>
                      </Flex>
                    </RadioCards.Item>

                    <RadioCards.Item
                      value="no"
                      className="py-2.5! px-3! w-full!"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Flex align="center" gap="2">
                        {!field.value ? (
                          <FaCircle className="text-(--green-9)" />
                        ) : (
                          <FaRegCircle className="text-medium-gray" />
                        )}
                        <Text weight="medium" size="2">
                          No
                        </Text>
                      </Flex>
                    </RadioCards.Item>
                  </RadioCards.Root>
                )}
              />

              <ErrorMessage varient="1">
                {errors.recommended?.message}
              </ErrorMessage>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2! xl:gap-8! mb-5 items-start">
          <label>
            <Text as="div" size="2" mb="1" weight="bold" className="text-white">
              remarks <Text color="red">*</Text>
            </Text>

            <TextField.Root
              {...register("remarks")}
              placeholder="Enter Remarks"
              className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-fit! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
              autoComplete="on"
            />
            <ErrorMessage varient="1">{errors.remarks?.message}</ErrorMessage>
          </label>
        </div>

        <UploadImagesForm
          ref={uploadFormRef}
          onUploadedFilesChange={(files) => setLocationPictures(files)}
          maxFiles={5}
          currentFileCount={locationPictures.length}
        />

        <Flex justify="center" mb="2">
          <Button
            type="submit"
            color="green"
            disabled={isSubmitting || locationPictures.length === 0}
            className="md:w-36.5! font-bold! text-[0.625rem]! py-3! px-4.25! h-full! rounded-[10px]! shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! leading-[100%]! text-white!"
          >
            Update Location {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>

      <Flex justify="center" className="pe-3">
        <Link
          href="/new-location"
          className="font-semibold! text-[#CBD5E1]! underline!"
        >
          Add New Bazaar Detail!
        </Link>
      </Flex>
    </>
  );
};

export default Form;
