"use client";
import { Badge, Button, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Spinner from "../Spinner";
import UploadImagesForm from "./Steps/UploadImagesForm";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ImageUploadIcon,
  LocationShare02Icon,
} from "@hugeicons/core-free-icons";
import CustomRadixInput from "../Form/CustomRadixInput";
import { uploadFile } from "@/app/utils/utils";
import { toast } from "react-toastify";
import apiClient from "@/app/services/api-client";
import Cookies from "js-cookie";
import CustomSelect, { OptionType } from "../Form/CustomSelect";
import useDastarKhwanLocations from "@/app/react-query/hooks/useDastarKhwanLocations";

const DailyUserInspectionForm = ({
  setStepNo,
  stepCompleted,
  isAftariHappening,
  refetchStepsStatus,
}: {
  setStepNo: Dispatch<SetStateAction<number>>;
  stepCompleted: boolean | null;
  isAftariHappening: boolean | null;
  refetchStepsStatus: () => void;
}) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    siteName: "",
    isAftariHappening: true,
    philanthropistName: "",
    philanthropistPhone: "",
    serveCapacity: 0,
    organization: "",
  });

  const [selfieUrl, setSelfieUrl] = useState("");
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const userId = Cookies.get("userId");
  const tehsilId = Cookies.get("tehsilId");
  const parsedTehsilId = tehsilId ? Number(tehsilId) : null;

  useEffect(() => {
    if (stepCompleted && isAftariHappening) {
      setStepNo(1);
    }
  }, [stepCompleted, isAftariHappening]);

  // useEffect(() => {
  //   if (dastarkhawanId) {
  //     setStepNo(1);
  //   }
  // }, []);

  const { data: dastarKhwanLocations } = useDastarKhwanLocations(
    parsedTehsilId || 0,
  );

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelfieChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await uploadFile(e, "dastarkhawan_incharge_selfie");

      if (response?.data?.fileUrl) {
        setSelfieUrl(response?.data?.fileUrl);
        toast.success("Selfie uploaded successfully");
      }
    } catch (error) {
      toast.error("Selfie upload failed");
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: "Current Location",
        });

        toast.success("Location captured");
      },
      () => {
        toast.error("Unable to fetch location");
      },
    );
  };

  const handleSiteChange = (option: OptionType | null) => {
    const selectedSite = dastarKhwanLocations?.find(
      (site) => site.id.toString() === option?.value,
    );

    setFormData((prev) => ({
      ...prev,
      siteName: option?.value || "",
      philanthropistName: selectedSite?.philanthropistName || "",
      philanthropistPhone: selectedSite?.philanthropistPhone || "",
      organization: selectedSite?.organization || "",
      serveCapacity: selectedSite?.serveCapacity || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !selfieUrl ||
      !location ||
      !formData.philanthropistName ||
      !formData.philanthropistPhone ||
      !formData.serveCapacity
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        dastarkhawanId: Number(formData.siteName),
        submissionDate: new Date().toISOString(),
        userId: userId,
        inspectionInchargeName: formData.fullName,
        inspectionInchargePhone: formData.phone,
        inspectionInchargeLatitude: location?.lat,
        inspectionInchargeLongitude: location?.lng,
        inspectionInchargeLocationAddress: location?.address,
        inspectionInchargeSelfieUrl: selfieUrl,
        isAftariHappening: formData.isAftariHappening,
        philanthropistName: formData.philanthropistName || null,
        philanthropistPhone: formData.philanthropistPhone || null,
        organization: formData.organization || null,
        serveCapacity: formData.serveCapacity || null,
      };

      console.log(payload, "payload");

      const response = await apiClient.post(
        "/api/DastarkhawanDailyMonitoring/step0-inspection-incharge",
        payload,
      );

      if (response?.data?.responseCode === 200) {
        if (response?.data?.data?.isAftariHappening) {
          toast.success(
            response?.data?.responseMessage ||
              "Incharge details saved successfully.",
          );
          Cookies.set("dastarkhawanId", response?.data?.data?.dastarkhawanId, {
            expires: 1,
          });
          setStepNo(1);
        } else {
          toast.success(
            response?.data?.responseMessage ||
              "Aftari is not happening for this site today",
          );
          Cookies.set("dastarkhawanId", response?.data?.data?.dastarkhawanId, {
            expires: 1,
          });
          // setStepNo(1);
        }
      } else {
        toast.error(response?.data?.responseMessage || "Submission failed");
      }

      console.log(response, "response");
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
      refetchStepsStatus();
    }
  };

  const siteOptions: OptionType[] =
    dastarKhwanLocations?.map((site) => ({
      label: site.name,
      value: site.id.toString(),
    })) || [];

  console.log(dastarKhwanLocations, "dastarKhwanLocations");

  return (
    <>
      {stepCompleted && isAftariHappening === false ? (
        <p className="font-semibold text-sm">
          Aftari is not happening for this site today. Next steps are not
          required.{" "}
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Flex direction="column" className="mb-5! gap-1.5!">
            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-dark! text-[13px]! mb-2.5!"
              >
                Full Name <Text color="red">*</Text>
              </Text>
              <CustomRadixInput
                placeholder="Enter Full Name"
                size="3"
                className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
                autoComplete="on"
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
              {/* <ErrorMessage varient="1">{errors.username?.message}</ErrorMessage> */}
            </label>
            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-dark! text-[13px]! mb-2.5!"
              >
                Phone No. <Text color="red">*</Text>
              </Text>
              <CustomRadixInput
                type="number"
                placeholder="Enter Phone No."
                size="3"
                className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
                autoComplete="on"
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {/* <ErrorMessage varient="1">{errors.username?.message}</ErrorMessage> */}
            </label>
            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-dark! text-[13px]! mb-2.5!"
              >
                Site Name <Text color="red">*</Text>
              </Text>

              <CustomSelect
                options={siteOptions}
                placeholder="Select Site"
                value={
                  siteOptions.find((opt) => opt.value === formData.siteName) ||
                  null
                }
                onChangeSingle={(option) => handleSiteChange(option)}
                isClearable
              />
            </label>
            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-dark! text-[13px]! mb-2.5!"
              >
                Philanthropist Name <Text color="red">*</Text>
              </Text>
              <CustomRadixInput
                placeholder="Enter Philanthropist Name"
                size="3"
                value={formData.philanthropistName || ""} // important
                className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
                autoComplete="on"
                onChange={(e) =>
                  handleChange("philanthropistName", e.target.value)
                }
              />
              {/* <ErrorMessage varient="1">
                {errors.philanthropistName?.message}
              </ErrorMessage> */}
            </label>

            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-dark! text-[13px]! mb-2.5!"
              >
                Philanthropist Phone No. <Text color="red">*</Text>
              </Text>
              <CustomRadixInput
                type="number"
                placeholder="Enter Phone No."
                value={formData.philanthropistPhone || ""}
                size="3"
                className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
                autoComplete="on"
                onChange={(e) =>
                  handleChange("philanthropistPhone", e.target.value)
                }
              />
              {/* <ErrorMessage varient="1">{errors.username?.message}</ErrorMessage> */}
            </label>

            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-dark! text-[13px]! mb-2.5!"
              >
                Serve Capacity <Text color="red">*</Text>
              </Text>
              <CustomRadixInput
                placeholder="Enter Serve Capacity"
                size="3"
                value={formData.serveCapacity || ""} // important
                className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
                autoComplete="on"
                onChange={(e) => handleChange("serveCapacity", e.target.value)}
              />
              {/* <ErrorMessage varient="1">
                {errors.philanthropistName?.message}
              </ErrorMessage> */}
            </label>

            <label>
              <Text
                as="p"
                mb="1"
                weight="bold"
                className="text-dark! text-[13px]! mb-2.5!"
              >
                Organization (Optional)
              </Text>
              <CustomRadixInput
                placeholder="Enter Organization Name"
                size="3"
                value={formData.organization || ""} // important
                className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
                autoComplete="on"
                onChange={(e) => handleChange("organization", e.target.value)}
              />
              {/* <ErrorMessage varient="1">
                {errors.philanthropistName?.message}
              </ErrorMessage> */}
            </label>

            <UploadImagesForm
              label="Upload Selfie"
              onChange={handleSelfieChange}
              selfieUrl={selfieUrl}
              description=""
              buttonLabel=""
              icon={
                <Badge color="green" className="p-3! rounded-full!">
                  <HugeiconsIcon
                    icon={ImageUploadIcon}
                    size={30}
                    className="text-(--green-9)!"
                  />
                </Badge>
              }
            />
            <div
              className="border border-dashed border-[#CBD5E1] p-4 rounded-4xl"
              onClick={getLocation}
            >
              <Flex justify="center" className="mb-2.5">
                <Badge radius="full" color="green" className="p-3!">
                  <HugeiconsIcon size={24} icon={LocationShare02Icon} />
                </Badge>
              </Flex>

              <Text as="p" align="center" weight="bold" color="green" size="2">
                Click Here{" "}
                <Text className="text-slate-gray" weight="medium">
                  to Update your Location.
                </Text>
              </Text>
            </div>

            <label>
              <Text
                as="p"
                mb="2"
                weight="bold"
                className="text-dark! text-[13px]! mb-2.5!"
              >
                Is Aftari Happening? <Text color="red">*</Text>
              </Text>

              <Flex gap="4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="aftari"
                    checked={formData.isAftariHappening === true}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isAftariHappening: true,
                      }))
                    }
                  />
                  <Text>Yes</Text>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="aftari"
                    checked={formData.isAftariHappening === false}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isAftariHappening: false,
                      }))
                    }
                  />
                  <Text>No</Text>
                </label>
              </Flex>
            </label>
          </Flex>
          <Button
            type="submit"
            color="green"
            // onClick={() => setStepNo(1)}
            className={classnames({
              "text-white!": isSubmitting,
              "w-full! font-bold! text-[0.625rem]! py-1.5! lg:py-3! px-4.25! h-full! rounded-[10px]! shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! leading-[100%]!": true,
            })}
            radius="full"
            disabled={
              isSubmitting ||
              !formData.fullName ||
              !formData.phone ||
              !selfieUrl ||
              !location
            }
          >
            <Text weight="bold" size="3">
              Update
            </Text>{" "}
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      )}
    </>
  );
};

export default DailyUserInspectionForm;
