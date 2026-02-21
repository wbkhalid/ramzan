"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Badge, Button, Flex, Text } from "@radix-ui/themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Video01Icon } from "@hugeicons/core-free-icons";
import { IoIosInformationCircle } from "react-icons/io";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CustomRadixTextarea from "@/app/components/Form/CustomRadixTextarea";
import MyRadioGroup from "@/app/components/Form/MyRadioGroup";
import MyBadge from "@/app/components/MyBadge";
import CardHeader from "../../../Navbar/CardHeader";
import UploadImagesForm from "../UploadImagesForm";
import apiClient from "@/app/services/api-client";
import { uploadFile, uploadMultipleFiles } from "@/app/utils/utils";

const Feedback = ({
  setStepNo,
  stepCompleted,
}: {
  setStepNo: Dispatch<SetStateAction<number>>;
  stepCompleted: boolean | null;
}) => {
  const [afterServingPhotoUrls, setAfterServingPhotoUrls] = useState<string[]>(
    [],
  );
  const [feedbackVideoUrl, setFeedbackVideoUrl] = useState("");
  const [feedbackGrade, setFeedbackGrade] = useState<number>(1);
  const [additionalRemarks, setAdditionalRemarks] = useState("");
  const [afterFoodLoading, setAfterFoodLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const userId = Cookies.get("userId");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setAfterFoodLoading(true);
      const uploadedFiles = await uploadMultipleFiles(
        e,
        "dastarkhawan_after_serving_photo",
      );

      const urls = uploadedFiles?.map((file: any) => file.fileUrl) || [];

      setAfterServingPhotoUrls((prev) => [...prev, ...urls]);

      toast.success("Images uploaded successfully");
    } catch (error) {
      toast.error("Error uploading images");
    } finally {
      setAfterFoodLoading(false);
    }
  };

  const handleFeedbackVideoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      setVideoLoading(true);
      const response = await uploadFile(e, "dastarkhawan_feedback_video");

      if (response?.data?.fileUrl) {
        setFeedbackVideoUrl(response.data.fileUrl);
        toast.success("Video uploaded successfully");
      }
    } catch (error) {
      toast.error("Video upload failed");
    } finally {
      setVideoLoading(false);
    }
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
        return 1;
    }
  };

  const handleSubmit = async () => {
    if (!afterServingPhotoUrls.length) {
      toast.error("Please upload after serving photos");
      return;
    }

    const payload = {
      dastarkhawanId: Number(Cookies.get("dastarkhawanId")),
      submissionDate: new Date().toISOString(),
      userId,
      afterServingPhotoUrls,
      feedbackVideoUrl,
      feedbackByFoodOfficer: feedbackGrade,
      additionalRemarks,
    };

    console.log(payload, "paylaod");

    try {
      console.log(payload);

      const response = await apiClient.post(
        "/api/DastarkhawanDailyMonitoring/step3-feedback",
        payload,
      );

      if (response?.data?.responseCode === 200) {
        toast.success(
          response?.data?.responseMessage ||
            "Step 3 (Feedback) submitted successfully",
        );
        Cookies.remove("dastarkhawanId");
        setStepNo(0);
      }

      console.log(response, "response");
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  return (
    <>
      {stepCompleted ? (
        <div className="text-center py-4">
          <Text className="text-green-500 font-bold">
            Step 2 is already completed
          </Text>
        </div>
      ) : (
        <>
          <div className="py-5 gap-5 flex flex-wrap sm:flex-nowrap justify-center">
            <Badge
              radius="full"
              color="green"
              className="font-bold! text-sm  md:text-base! py-2.25! px-3.5!"
            >
              1
            </Badge>

            <div className="w-full">
              <Flex justify="between" className="mb-5" wrap="wrap" gap="2">
                <CardHeader
                  headingSize="4"
                  heading="Pictorial Evidence After Food Serving"
                  label="Upload photographic documentation"
                />
                {/* <MyBadge label="Deadline : 8:00 PM" /> */}
              </Flex>

              <div className="flex flex-col gap-2.5">
                <div>
                  <UploadImagesForm
                    label="After Food Serving"
                    description="Upload Images"
                    onChange={handleImageChange}
                    isLoading={afterFoodLoading}
                  />

                  {/* Image Preview */}
                  {afterServingPhotoUrls.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {afterServingPhotoUrls.map((url, index) => (
                        <div
                          key={index}
                          className="relative w-16 h-16 rounded-lg overflow-hidden border"
                        >
                          <img
                            src={url}
                            alt={`after-serving-${index}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() =>
                              setAfterServingPhotoUrls((prev) =>
                                prev.filter((_, i) => i !== index),
                              )
                            }
                            className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <UploadImagesForm
                  label="Feedback Video"
                  description="Upload 30 sec Video"
                  message="MP4 (Max 10MB)"
                  accept="video/mp4"
                  type="video"
                  onChange={handleFeedbackVideoChange}
                  isLoading={videoLoading}
                />
              </div>

              {/* Feedback Video */}

              {/* Feedback Grade */}
              <div className="mt-6">
                <CardHeader
                  headingSize="4"
                  heading="Feedback by Food Officer"
                  label="Feedback"
                />

                <MyRadioGroup
                  options={[
                    { label: "Excellent", value: "excellent" },
                    { label: "Good", value: "good" },
                    { label: "Average", value: "average" },
                    { label: "Poor", value: "poor" },
                  ]}
                  onChange={(val) => setFeedbackGrade(getGradeNumber(val))}
                />
              </div>

              {/* Additional Remarks */}
              <div className="mt-6">
                <CardHeader
                  headingSize="5"
                  heading="Additional Remarks"
                  label="Any observations or issues"
                />
                <CustomRadixTextarea
                  placeholder="Enter Remarks..."
                  value={additionalRemarks}
                  onChange={(e) => setAdditionalRemarks(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-medium-gray pt-3.75 ">
            <Flex
              direction={{ initial: "column", md: "row" }}
              justify={{ md: "between" }}
              align={{ md: "center" }}
              gap="3"
              className="w-full"
            >
              <Flex align="center" gap="2">
                <IoIosInformationCircle size={20} />
                <Text size="2" weight="medium">
                  All fields marked with <Text color="red">*</Text> are
                  mandatory
                </Text>
              </Flex>

              <Button type="button" onClick={handleSubmit} color="green">
                Save & Continue
              </Button>
            </Flex>
          </div>
        </>
      )}
    </>
  );
};

export default Feedback;
