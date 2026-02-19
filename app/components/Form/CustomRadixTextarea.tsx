"use client";

import { TextArea } from "@radix-ui/themes";
import { forwardRef } from "react";
import clsx from "clsx";

type RadixTextAreaProps = React.ComponentPropsWithoutRef<typeof TextArea>;

const CustomRadixTextarea = forwardRef<HTMLTextAreaElement, RadixTextAreaProps>(
  ({ className, style, ...rest }, ref) => {
    return (
      <TextArea
        ref={ref}
        {...rest}
        className={clsx(
          "w-full",
          "bg-[rgba(244,244,244,0.2)]",
          "rounded-[10px]",
          "px-3 py-3",
          "text-slate-gray",
          "placeholder:text-slate-gray placeholder:font-medium placeholder:text-base",
          "outline-none ring-0",
          "shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]",
          "focus:shadow-[0px_0px_0px_2px_rgba(203,213,225,0.4)]",
          "transition-all duration-300",
          "resize-none", // optional (remove if you want resize)
          className,
        )}
        style={style}
      />
    );
  },
);

CustomRadixTextarea.displayName = "CustomRadixTextarea";

export default CustomRadixTextarea;
