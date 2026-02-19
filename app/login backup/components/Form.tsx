"use client";

import { OptionType } from "@/app/components/Form/CustomSelect";
import Spinner from "@/app/components/Spinner";
import apiClient from "@/app/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { GroupBase, StylesConfig } from "react-select";
import { toast } from "sonner";
import z from "zod";
import { LoginClientResponse } from "../types";
import { NEXTJS_AUTH_API } from "@/app/APIs";
import classnames from "classnames";

const schema = z.object({
  username: z
    .string()
    .min(1, { message: "Please add User Name!" })
    .default("ramadanbazar@attock.com"),
  password: z
    .string()
    .min(1, { message: "Please add Password!" })
    .default("Rb@123456!"),
});

export type Login = z.infer<typeof schema>; // this interface is for form data
type LoginInput = z.input<typeof schema>; // this interface is for form data

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(schema),
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (formData: LoginInput) => {
    try {
      setSubmitting(true);

      const res = await apiClient.post<LoginClientResponse>(
        NEXTJS_AUTH_API + "/login",
        formData,
      );
      console.log("res", res);
      if (res.data.StatusCode === 200) {
        toast.success(res.data.Message);
        router.push("/update-location");
      } else {
        toast.error(res.data.Message);
      }
    } catch (err) {
      toast.error((err as AxiosError).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="6" className="mb-5!">
        <label>
          <Text
            as="p"
            mb="1"
            weight="bold"
            className="text-white! text-[13px]!"
          >
            Username
          </Text>
          <TextField.Root
            {...register("username")}
            placeholder="User Name"
            size="3"
            className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
            autoComplete="on"
          />
          {errors.username && (
            <p className="text-main mt-1">{errors.username.message}</p>
          )}
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold" className="text-white">
            Password
          </Text>
          <TextField.Root
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="**********"
            radius="full"
            size="3"
            className="w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#CBD5E1]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! focus-within:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#CBD5E1]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
            autoComplete="current-password"
          >
            {/* <TextField.Slot>
              <HugeiconsIcon
                icon={PasswordValidationIcon}
                size={20}
                color="#475569"
              />
            </TextField.Slot> */}

            {/* Right eye toggle slot */}
            <TextField.Slot side="right">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer focus:outline-none relative"
              >
                <FaRegEye
                  size={20}
                  color="#CBD5E1"
                  className={`absolute -top-2 right-0 transition-all ${
                    showPassword
                      ? "opacity-100 scale-y-100 duration-400 "
                      : "opacity-0 scale-y-0 duration-500 "
                  }`}
                />

                {/* Closed Eye */}
                <TbEyeClosed
                  color="#CBD5E1"
                  size={20}
                  className={`absolute right-0 rotate-0 transition-all duration-500  ${
                    !showPassword
                      ? "opacity-100 -top-1 scale-y-100 "
                      : "opacity-0 -top-3.5 scale-y-0"
                  }`}
                />

                {/* Eye Closed Flipped */}
                <TbEyeClosed
                  color="#CBD5E1"
                  size={20}
                  className={`absolute right-0 rotate-180 transition-all duration-500 ${
                    showPassword
                      ? "opacity-100 -top-3.5 scale-y-100"
                      : "opacity-0 -top-1 scale-y-0"
                  }`}
                />
              </button>
            </TextField.Slot>
          </TextField.Root>
          {errors.password && (
            <p className="text-main mt-1">{errors.password.message}</p>
          )}
        </label>
      </Flex>
      <Button
        type="submit"
        className={classnames({
          "text-white!": isSubmitting,
          "w-full! bg-[#063A6A]! font-bold! text-[0.625rem]! py-3! px-4.25! h-full! rounded-[10px]! shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! leading-[100%]!": true,
        })}
        radius="full"
        disabled={isSubmitting}
      >
        <Text weight="bold" size="3">
          Login
        </Text>{" "}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default Form;

// Custom Single Select Style
export const customSingleSelectStyles: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (base, state) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "rgba(6, 58, 106,.1)",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#22a3bd",
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "rgba(6, 58, 106,.5)",
    },
    background: "rgba(244,244,244,0.2)",
    borderRadius: 10,
    color: "#CBD5E1",
    padding: "13px 12px",
    lineHeight: "1",
    fontWeight: 500,
    fontSize: "16px",
    border: "none",
    boxShadow: state.isFocused
      ? "0 0 0 0.063rem rgba(203,213,225,0.4)"
      : "0 0 0 0.063rem rgba(203,213,225,0.4)",
    transition: "all 0.3s",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#CBD5E1", // Set the placeholder color
    fontWeight: 500,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: 0,
    color: state.selectProps.menuIsOpen ? "#CBD5E1" : "#fff",

    ":hover": {
      color: "#CBD5E1",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff", // ✅ White text for selected value
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 4,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "#fff",
  }),
  menu: (base) => ({
    ...base,
    // ✅ CRITICAL: Increased z-index to be above Radix Dialog
    zIndex: 99999,
    padding: "13px 12px",
    borderRadius: 10,
    border: 0,
    boxShadow: "0px 0px 7px 3px rgba(203,213,225,0.4)",
  }),
  menuPortal: (base) => ({
    ...base,
    // ✅ CRITICAL: Must be higher than Radix Dialog overlay (default is around 9999)
    zIndex: 99999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#CBD5E1"
      : state.isFocused
        ? "rgba(6, 58, 106,.2)"
        : "white",
    color: state.isSelected ? "black" : "#333",
    fontSize: "14px",
    padding: "10px",
    borderRadius: 8,
    // ✅ Ensure pointer events work
    cursor: "pointer",
    pointerEvents: "auto",
    ":active": {
      backgroundColor: "#4b5563", // or your desired color
      color: "#f9fafb",
    },
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 43 * 6,
    // ✅ Ensure pointer events work
    pointerEvents: "auto",
    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#6292bf",
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#2e71b0",
    },
  }),
};
