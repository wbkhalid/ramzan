import apiClient from "@/app/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft01Icon,
  LocationShare02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Flex, Button, TextField } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginClientResponse } from "../../types";
import z from "zod";

const schema = z.object({
  userName: z.string().min(1, { message: "Please add User Name!" }),
  password: z.string().min(1, { message: "Please add Password!" }),
  userTypeId: z
    .number()
    .min(1, { message: "Please add UserTypeId!" })
    .default(1),
  appVersion: z
    .number()
    .min(1, { message: "Please add App Version!" })
    .default(1.4),
  loginWith: z
    .string()
    .min(1, { message: "Please add Login With!" })
    .default("CPAPP"),
  applicationName: z
    .string()
    .min(1, { message: "Please add Application Name!" })
    .default("FSCPDOPERATIONAL"),
});

export type Login = z.infer<typeof schema>; // this interface is for form data
type LoginInput = z.input<typeof schema>; // this interface is for form data

const Form = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(schema) });
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (formData: LoginInput) => {
    try {
      setSubmitting(true);

      const res = await apiClient.post<LoginClientResponse>(
        "/register",
        formData,
      );
      console.log("res", res);
      if (res.data.StatusCode === 200) {
        toast.success(res.data.Message);
        router.push("/");
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
      <Flex justify="between" className="gap-2.5!" align="center" wrap="wrap">
        <Button className="p-3.5! h-full! bg-white! text-[#475569]! rounded-[10px]!">
          <HugeiconsIcon size={20} icon={ArrowLeft01Icon} />
        </Button>
        <TextField.Root
          placeholder="Search Location"
          size="3"
          className="w-fit! [&_input]:font-medium! [&_input]:py-3.25! [&_input]:px-2!  bg-white! h-full! [&_input]:rounded-[10px]! rounded-[10px]! text-[#475569]! focus:ring-0! outline-0! ring-0! hover:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! active:shadow-[0px_0px_0px_1.5px_rgba(203,213,225,0.4)]! transition-all! duration-300! [&_input::placeholder]:text-[#475569]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!"
          autoComplete="on"
        >
          <TextField.Slot side="left" className="pe-0!">
            <HugeiconsIcon icon={LocationShare02Icon} />
          </TextField.Slot>
          <TextField.Slot side="right" className="ps-0!">
            <HugeiconsIcon size={20} icon={Search01Icon} />
          </TextField.Slot>
        </TextField.Root>

        <Button className="w-29.75! bg-[#063A6A]! font-bold! text-[0.625rem]! p-3.5! h-full! rounded-[10px]! shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]! ">
          Continue
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
