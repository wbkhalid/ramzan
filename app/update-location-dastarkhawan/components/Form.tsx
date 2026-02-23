"use client";

import { DASTARKHAWN_API } from "@/app/APIs";
import CustomSelect, {
  defaultOption,
  OptionType,
} from "@/app/components/Form/CustomSelect";
import ErrorMessage from "@/app/components/Form/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { customSingleSelectStyles } from "@/app/login/components/Form";
import useDastarKhwanLocations from "@/app/react-query/hooks/useDastarKhwanLocations";
import apiClient from "@/app/services/api-client";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { toast } from "sonner";
import z from "zod";
import { DistrictLookup, TehsilLookup } from "../page";
import MapDialog from "./MyMap/MapDialog";
import UploadImagesForm, {
  UploadedFile,
  UploadImagesFormHandle,
} from "@/app/new-location/components/UploadImagesForm";

const locationPictures = z.object({
  pathUrl: z.string().min(1, { message: "Please add recommended!" }),
});

const schema = z.object({
  tehsilId: z
    .number({ error: "Please add tehsil!" })
    .min(1, "Please add tehsil!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add tehsil!" }),
  locationId: z
    .number({ error: "Please add location!" })
    .min(1, "Please add location!")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Please add location!" }),
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
  observationsByFST: z
    .string()
    .min(1, { message: "Please add observations by FST!" }),
  recommended: z.boolean().default(true),
  remarks: z.string().min(1, { message: "Please add remarks!" }),
  isActive: z.boolean().default(true),
  userId: z.string().min(1, { message: "Please add user!" }),
  assignedTo: z.string().min(1, { message: "Please add assigned to!" }),
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
  districtData: DistrictLookup;
  tehsilsData: TehsilLookup[];
  userId: string;
}

const Form = ({ districtData, tehsilsData, userId }: Props) => {
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
      assignedTo: userId,
      recommended: true,
    },
  });

  console.log("errors", errors);

  const districtOption: OptionType = {
    label: districtData.name,
    value: districtData.id.toString(),
  };

  const tehsilOptions: OptionType[] | undefined = tehsilsData.map((d) => {
    return {
      label: d.name,
      value: d.id.toString(),
    };
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const selectedTehsilId = watch("tehsilId");
  const selectedLocationId = watch("locationId");

  const {
    data: dastarKhwanLocations,
    isLoading,
    isFetching,
  } = useDastarKhwanLocations(selectedTehsilId);

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
    if (!selectedLocationId || !dastarKhwanLocations?.length) return;

    const selectedLocation = dastarKhwanLocations.find(
      (loc) => loc.id === selectedLocationId,
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
    }

    if (selectedLocation.longitude != null) {
      setValue("longitude", selectedLocation.longitude, {
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [selectedLocationId, dastarKhwanLocations, setValue]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setValue("latitude", lat);
    setValue("longitude", lng);
  };

  // ✅ Helper function to reset all form state
  const resetFormState = () => {
    // Reset react-hook-form fields to default values
    reset({
      userId,
      assignedTo: userId,
      recommended: true,
      tehsilId: 0,
      locationId: 0,
      latitude: 0,
      longitude: 0,
      observationsByFST: "",
      remarks: "",
      isActive: true,
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

      // Submit the main form
      const res = await apiClient.post(
        DASTARKHAWN_API + "/update-location-details",
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-5">
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

            <ErrorMessage>{errors.tehsilId?.message}</ErrorMessage>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-8 mb-5 items-start">
          <div className="col-span-1 md:col-span-5">
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-white"
              >
                Address of each site <Text color="red">*</Text>
              </Text>
              <Controller
                name="locationId"
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
                    }}
                  />
                )}
              />
              <ErrorMessage>{errors.locationId?.message}</ErrorMessage>
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
              <ErrorMessage>{errors.latitude?.message}</ErrorMessage>
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
              <ErrorMessage>{errors.longitude?.message}</ErrorMessage>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-5 items-start">
          <div className="col-span-1 md:col-span-6">
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-white"
              >
                Observations <Text color="red">*</Text>
              </Text>

              <TextField.Root
                {...register("observationsByFST")}
                placeholder="Enter Observations"
                className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-fit! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
                autoComplete="on"
              />
              <ErrorMessage>{errors.observationsByFST?.message}</ErrorMessage>
            </label>
          </div>
          <div className="col-span-1 md:col-span-6">
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

              <ErrorMessage>{errors.recommended?.message}</ErrorMessage>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-5 items-start">
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
            <ErrorMessage>{errors.remarks?.message}</ErrorMessage>
          </label>
        </div>

        <UploadImagesForm
          ref={uploadFormRef}
          onUploadedFilesChange={(files) => setLocationPictures(files)}
          maxFiles={5}
          currentFileCount={locationPictures.length}
        />

        <Flex justify="center">
          <Button
            type="submit"
            disabled={isSubmitting || locationPictures.length === 0}
            className="md:w-36.5! bg-[#063A6A]! font-bold! text-[0.625rem]! py-3! px-4.25! h-full! rounded-[10px]! shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! leading-[100%]! text-white!"
          >
            Update Location {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>

      <Flex justify="end" className="pe-3">
        <Link
          href="/new-location-dastarkhawan"
          className="font-semibold! text-[#CBD5E1]! underline!"
        >
          Add New Location!
        </Link>
      </Flex>
    </>
  );
};

export default Form;
