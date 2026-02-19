"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Flex, Badge, Button, Text } from "@radix-ui/themes";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignCircleIcon,
  Cancel01Icon,
  ArrowUp01Icon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons";
import { IoIosInformationCircle } from "react-icons/io";
import Cookies from "js-cookie";
import CustomRadixInput from "@/app/components/Form/CustomRadixInput";
import CardHeader from "../../../Navbar/CardHeader";
import UploadImagesForm from "../UploadImagesForm";
import MyBadge from "@/app/components/MyBadge";
import { uploadFile } from "@/app/utils/utils";
import { toast } from "react-toastify";
import apiClient from "@/app/services/api-client";

const Food = ({
  setStepNo,
}: {
  setStepNo: Dispatch<SetStateAction<number>>;
}) => {
  const [menuInput, setMenuInput] = useState("");
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [numberServed, setNumberServed] = useState<number>(0);
  const [menuPhotoUrl, setMenuPhotoUrl] = useState("");
  const [servingPhotoUrl, setServingPhotoUrl] = useState("");
  const userId = Cookies.get("userId");
  const dastarkhawanId = Cookies.get("dastarkhawanId");
  const parsedDastarkhawanId = dastarkhawanId ? Number(dastarkhawanId) : null;

  console.log(parsedDastarkhawanId, "..//...//");

  const addMenuItem = () => {
    if (menuInput.trim() && !menuItems.includes(menuInput.trim())) {
      setMenuItems((prev) => [...prev, menuInput.trim()]);
      setMenuInput("");
    }
  };

  const handleMenuChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await uploadFile(e, "dastarkhawan_menu_photo");

      if (response?.data?.fileUrl) {
        setMenuPhotoUrl(response?.data?.fileUrl);
        toast.success("Menu photo uploaded successfully");
      }
    } catch (error) {
      toast.error("Menu photo upload failed");
    }
  };

  const handleServingPhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const response = await uploadFile(e, "dastarkhawan_serving_photo");

      if (response?.data?.fileUrl) {
        setServingPhotoUrl(response?.data?.fileUrl);
        toast.success("Serving photo uploaded successfully");
      }
    } catch (error) {
      toast.error("Serving photo upload failed");
    }
  };

  const removeMenuItem = (item: string) => {
    setMenuItems((prev) => prev.filter((i) => i !== item));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        dastarkhawanId: parsedDastarkhawanId,
        submissionDate: new Date().toISOString(),
        userId: userId,
        menuItems,
        menuPhotoUrl,
        numberServed,
        servingPhotoUrl,
      };

      const response = await apiClient.post(
        "/api/DastarkhawanDailyMonitoring/step2-food",
        payload,
      );

      if (response?.data?.responseCode === 200) {
        toast.success(
          response?.data?.responseMessage ||
            "Step 1 (Setup) submitted successfully",
        );

        setStepNo(3);
      }
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  return (
    <>
      {/* 1. Menu Details */}
      <div className="py-5 gap-5 flex flex-wrap sm:flex-nowrap justify-center">
        <Badge
          radius="full"
          color="green"
          className="font-bold! text-[17px]! py-2.25! px-3.5!"
        >
          1
        </Badge>
        <div className="w-full">
          <Flex justify="between" className="mb-5" wrap="wrap" gap="2">
            <CardHeader
              headingSize="5"
              heading="All Menu Details"
              label="Menu Details"
            />
            <MyBadge label="Deadline : 6:00 PM" />
          </Flex>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-2.5 items-end">
            <div className="col-span-2">
              <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
                Enter Menu Items <Text color="red">*</Text>
              </Text>
              <CustomRadixInput
                placeholder="Enter Menu Name"
                value={menuInput}
                onChange={(e) => setMenuInput(e.target.value)}
              />
            </div>
            <Button
              color="green"
              className="py-3.25! h-fit! rounded-[10.5px]!"
              onClick={addMenuItem}
            >
              <Flex className="gap-2.5" align="center">
                <HugeiconsIcon
                  icon={PlusSignCircleIcon}
                  color="white"
                  size={20}
                />
                <Text className="text-white">Add New Item</Text>
              </Flex>
            </Button>
          </div>

          {/* Dynamic Menu Items */}
          <Flex className="gap-2.5! mb-5! flex-wrap">
            {menuItems.map((item) => (
              <Button
                key={item}
                color="orange"
                className="py-2.5! px-3! bg-(--orange-9)/10! rounded-[7px]! ring-1! ring-(--orange-9)/50! h-fit!"
                onClick={() => removeMenuItem(item)}
              >
                <Flex className="gap-2.5" align="center">
                  <Text className="text-[#472D03]!">{item}</Text>
                  <HugeiconsIcon
                    className="text-(--orange-9)"
                    icon={Cancel01Icon}
                    color="white"
                    size={20}
                  />
                </Flex>
              </Button>
            ))}
          </Flex>

          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Menu Photo <Text color="red">*</Text>
            </Text>
            <div className="w-full sm:w-90">
              <UploadImagesForm
                description="Menu Photos"
                onChange={handleMenuChange}
                selfieUrl={menuPhotoUrl}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Beneficiaries */}
      <div className="py-5 gap-5 flex flex-wrap sm:flex-nowrap justify-center">
        <Badge
          radius="full"
          color="green"
          className="font-bold! text-[17px]! py-2.25! px-3.5!"
        >
          2
        </Badge>
        <div className="w-full">
          <Flex justify="between" className="mb-5" wrap="wrap" gap="2">
            <CardHeader
              headingSize="5"
              heading="Beneficiaries"
              label="Record number of Beneficiaries"
            />
          </Flex>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-2.5 items-end">
            <div className="col-span-2">
              <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
                Beneficiaries <Text color="red">*</Text>
              </Text>
              <CustomRadixInput
                type="number"
                placeholder="Enter Beneficiaries"
                value={numberServed}
                onChange={(e) => setNumberServed(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mb-5">
            <Text as="p" className="text-[13px]! mb-2.5!" weight="bold">
              Serving Photo <Text color="red">*</Text>
            </Text>
            <div className="w-full sm:w-90">
              <UploadImagesForm
                description="Serving Photos"
                onChange={handleServingPhotoChange}
                selfieUrl={servingPhotoUrl}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-medium-gray pt-3.75 -mx-7.5!">
        <Flex align="center" gap="2" justify="between" className="px-5!">
          <Flex align="center" gap="2">
            <IoIosInformationCircle size={20} className="text-dark-gray" />
            <Text size="2" weight="medium">
              All fields marked with <Text color="red">*</Text> are mandatory
            </Text>
          </Flex>
          <Button
            type="button"
            onClick={handleSubmit}
            className="py-2.5! px-4.25! h-fit! rounded-[3.5px]! text-[10px]! font-bold!"
            color="green"
          >
            Save & Continue
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default Food;
