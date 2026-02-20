"use client";

import { Flex, Badge, Box, Button, Text } from "@radix-ui/themes";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { LocationShare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { IoIosInformationCircle } from "react-icons/io";

import CustomRadixInput from "@/app/components/Form/CustomRadixInput";
import MyRadioGroup from "@/app/components/Form/MyRadioGroup";
import UploadImagesForm from "../UploadImagesForm";
import CardHeader from "../../../Navbar/CardHeader";
import useCheckLists from "@/app/react-query/hooks/ramzan-monitoring/useCheckLists";
import apiClient from "@/app/services/api-client";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { uploadFile } from "@/app/utils/utils";

const Setup = ({
  setStepNo,
}: {
  setStepNo: Dispatch<SetStateAction<number>>;
}) => {
  const tehsilId = Cookies.get("tehsilId");
  const parsedTehsilId = tehsilId ? Number(tehsilId) : null;

  const { data: checkLists } = useCheckLists();

  const [formData, setFormData] = useState({
    dcFocalPersonName: "",
    dcFocalPersonPhone: "",
    dcFocalPersonPhotoUrl: "",
    latitude: null as number | null,
    longitude: null as number | null,
    locationAddress: "",
    setupLocationPhotoUrl: "",
    brandingApplicable: null as boolean | null,
    brandingPhotoUrl: "",
  });

  const [checklistAnswers, setChecklistAnswers] = useState<
    {
      questionId: number;
      grade?: number;
      yesNo?: boolean;
      remarks?: string;
      photoUrl?: string;
    }[]
  >([]);

  // Initialize checklistAnswers whenever checkLists load
  useEffect(() => {
    if (checkLists) {
      setChecklistAnswers((prev) => {
        return checkLists.map((c) => {
          const existing = prev.find((p) => p.questionId === c.id);
          return (
            existing || {
              questionId: c.id,
              grade: undefined,
              yesNo: undefined,
              photoUrl: "",
            }
          );
        });
      });
    }
  }, [checkLists]);

  // --- Location Capture ---
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationAddress: "Current Location",
        }));
        toast.success("Location captured!");
      },
      () => toast.error("Unable to fetch location"),
    );
  };

  // --- Photo Uploads ---
  const handleUpload = async (
    category: string,
    key: keyof typeof formData,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const response = await uploadFile(e, category);
    if (response?.data?.fileUrl) {
      setFormData((prev) => ({
        ...prev,
        [key]: response.data.fileUrl,
      }));
    }
  };

  const handleChecklistPhoto = async (
    questionId: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const response = await uploadFile(e, "dastarkhawan_checklist_item_photo");
    if (response?.data?.fileUrl) {
      setChecklistAnswers((prev) =>
        prev.map((item) =>
          item.questionId === questionId
            ? { ...item, photoUrl: response.data.fileUrl }
            : item,
        ),
      );
    }
  };

  // --- Checklist Answer Handler ---
  const handleChecklistChange = (
    questionId: number,
    value: string,
    answerType: number,
  ) => {
    setChecklistAnswers((prev) =>
      prev.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              grade: answerType === 1 ? getGradeNumber(value) : undefined,
              yesNo: answerType !== 1 ? value === "yes" : undefined,
            }
          : q,
      ),
    );
  };

  const getGradeNumber = (value: string) => {
    switch (value) {
      case "excellent":
        return 1;
      case "good":
        return 2;
      case "average":
        return 3;
      case "poor":
        return 4;
      default:
        return 0;
    }
  };

  const getGradeString = (grade: number) => {
    switch (grade) {
      case 1:
        return "excellent";
      case 2:
        return "good";
      case 3:
        return "average";
      case 4:
        return "poor";
      default:
        return "";
    }
  };

  const icons = [
    {
      id: 1,
      src: "/icons/clean.svg",
    },
    {
      id: 2,
      src: "/icons/bus-03.svg",
    },
    {
      id: 3,
      src: "/icons/droplet.svg",
    },
    {
      id: 4,
      src: "/icons/shield-02.svg",
    },
  ];

  const handleSubmit = async () => {
    try {
      const payload = {
        dastarkhawanId: Number(Cookies.get("dastarkhawanId")),
        submissionDate: new Date().toISOString(),
        userId: Cookies.get("userId"),
        dcFocalPersonName: formData.dcFocalPersonName,
        dcFocalPersonPhone: formData.dcFocalPersonPhone,
        dcFocalPersonPhotoUrl: formData.dcFocalPersonPhotoUrl,
        tehsilId: parsedTehsilId,
        latitude: formData.latitude,
        longitude: formData.longitude,
        locationAddress: formData.locationAddress,
        setupLocationPhotoUrl: formData.setupLocationPhotoUrl,
        brandingApplicable: formData.brandingApplicable,
        brandingPhotoUrl: formData.brandingPhotoUrl,
        checklist: checklistAnswers.map((item) => ({
          questionId: item.questionId,
          grade: item.grade ?? 0,
          yesNo: item.yesNo ?? false,
          remarks: item.remarks ?? "",
          photoUrl: item.photoUrl ?? "",
        })),
      };

      const response = await apiClient.post(
        "/api/DastarkhawanDailyMonitoring/step1-setup",
        payload,
      );

      if (response?.data?.responseCode === 200) {
        toast.success(
          response?.data?.responseMessage ||
            "Step 1 (Setup) submitted successfully",
        );
        // Cookies.set("monitoringId", response?.data?.data?.id);
        // Cookies.set("dastarkhawanId", response?.data?.data?.dastarkhawanId);
        setStepNo(2);
      }
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* 1. DC Office Focal Person */}
      <Flex direction="column" gap="4">
        <Badge
          radius="full"
          color="blue"
          className="text-[17px]! py-2.25! px-3.5!"
        >
          1
        </Badge>
        <CardHeader
          heading="DC Office Focal Person Details"
          headingSize="5"
          label="Update Focal Person Details"
        />
        <CustomRadixInput
          placeholder="Enter Name"
          value={formData.dcFocalPersonName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dcFocalPersonName: e.target.value,
            }))
          }
        />
        <CustomRadixInput
          placeholder="Enter Phone No."
          value={formData.dcFocalPersonPhone}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dcFocalPersonPhone: e.target.value,
            }))
          }
        />
        <UploadImagesForm
          description="Focal Person Photo"
          onChange={(e) =>
            handleUpload(
              "dastarkhawan_dc_focal_photo",
              "dcFocalPersonPhotoUrl",
              e,
            )
          }
          selfieUrl={formData.dcFocalPersonPhotoUrl}
        />
      </Flex>

      {/* 2. Setup Details */}
      <Flex direction="column" gap="4" className="mt-6">
        <Badge
          radius="full"
          color="blue"
          className="text-[17px]! py-2.25! px-3.5!"
        >
          2
        </Badge>
        <CardHeader
          heading="Setup Details"
          headingSize="5"
          label="Update Setup Details"
        />
        <Flex
          className="border border-dashed border-[#CBD5E1] p-4 rounded-4xl cursor-pointer"
          justify="center"
          onClick={getLocation}
        >
          <HugeiconsIcon size={24} icon={LocationShare02Icon} />
          <Text weight="bold" color="green" className="ml-2">
            Click to Capture Location
          </Text>
        </Flex>
        <UploadImagesForm
          description="Setup Photos"
          onChange={(e) =>
            handleUpload(
              "dastarkhawan_setup_location_photo",
              "setupLocationPhotoUrl",
              e,
            )
          }
          selfieUrl={formData.setupLocationPhotoUrl}
        />
      </Flex>

      {/* 3. Branding Details */}
      <Flex direction="column" gap="4" className="mt-6">
        <Badge
          radius="full"
          color="blue"
          className="text-[17px]! py-2.25! px-3.5!"
        >
          3
        </Badge>
        <CardHeader
          heading="Branding Details"
          headingSize="5"
          label="Update Branding Details"
        />
        <MyRadioGroup
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          value={formData.brandingApplicable ? "yes" : "no"}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              brandingApplicable: val === "yes",
            }))
          }
        />
        <UploadImagesForm
          description="Branding Photos"
          onChange={(e) =>
            handleUpload("dastarkhawan_branding_photo", "brandingPhotoUrl", e)
          }
          selfieUrl={formData.brandingPhotoUrl}
        />
      </Flex>

      {/* 4. Checklist */}
      <Flex direction="column" gap="4" className="mt-6">
        <Badge
          radius="full"
          color="blue"
          className="text-[17px]! py-2.25! px-3.5!"
        >
          4
        </Badge>
        <CardHeader
          heading="Regular Monitoring Checklist"
          headingSize="5"
          label="Verify operational standards"
        />
        <Box>
          <Flex direction="column" className="gap-2.5">
            {checkLists?.map((checklist, index) => {
              const answer = checklistAnswers.find(
                (a) => a.questionId === checklist.id,
              );

              const iconSrc = icons[index % icons.length]?.src;

              return (
                <Flex
                  key={checklist.id}
                  // align="center"
                  className="flex-col md:flex-row gap-2 w-full!"
                >
                  <Flex
                    align="center"
                    justify="between"
                    className="flex-col md:flex-row border-[1.5px] border-[#EFF0F2] py-2.5 ps-3 pe-7.5 rounded-[7px] w-full"
                    gap="4"
                  >
                    <CardHeader
                      headingSize="3"
                      headingWeight="medium"
                      labelSize="2"
                      gap="10px"
                      heading={checklist.title}
                      label={checklist.description}
                      icon={
                        <div className="p-3 bg-(--blue-9)/20 rounded-[10px]">
                          <Image
                            className="rounded-full"
                            src={iconSrc}
                            width={24}
                            height={24}
                            style={{ width: "24px", height: "24px" }}
                            alt="clean"
                          />
                        </div>
                      }
                    />

                    {/* Radio options */}
                    <MyRadioGroup
                      options={
                        checklist.answerType === 1
                          ? [
                              { label: "Excellent", value: "excellent" },
                              { label: "Good", value: "good" },
                              { label: "Average", value: "average" },
                              { label: "Poor", value: "poor" },
                            ]
                          : [
                              { label: "Yes", value: "yes" },
                              { label: "No", value: "no" },
                            ]
                      }
                      value={
                        checklist.answerType === 1
                          ? getGradeString(answer?.grade ?? 0)
                          : answer?.yesNo
                            ? "yes"
                            : "no"
                      }
                      onChange={(val) =>
                        handleChecklistChange(
                          checklist.id,
                          val,
                          checklist.answerType,
                        )
                      }
                    />
                  </Flex>

                  {/* Checklist photo upload */}
                  <UploadImagesForm
                    description="Upload Photo"
                    onChange={(e) => handleChecklistPhoto(checklist.id, e)}
                    selfieUrl={answer?.photoUrl ?? ""}
                  />
                </Flex>
              );
            })}
          </Flex>
        </Box>
      </Flex>

      <Flex
        direction={{ initial: "column", md: "row" }}
        justify={{ md: "between" }}
        align={{ md: "center" }}
        gap="3"
        className="mt-6 w-full"
      >
        <Text className="text-sm">
          <IoIosInformationCircle className="inline mr-1" />
          All fields marked with * are mandatory
        </Text>

        <Button type="submit" color="green" className="w-full md:w-auto">
          Save & Continue
        </Button>
      </Flex>
    </form>
  );
};

export default Setup;
