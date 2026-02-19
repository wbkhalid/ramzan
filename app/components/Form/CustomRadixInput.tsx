"use client";
import { TextField } from "@radix-ui/themes";
import { forwardRef } from "react";
import clsx from "clsx";

// Use Root's prop type so there are no conflicts
type RadixRootProps = React.ComponentPropsWithoutRef<typeof TextField.Root>;

const CustomRadixInput = forwardRef<HTMLInputElement, RadixRootProps>(
  ({ className, style, ...rest }, ref) => {
    return (
      <TextField.Root
        ref={ref}
        {...rest} // allowed props (placeholder, value, onChange, etc.)
        className={clsx(
          "w-full! [&_input]:py-3.25! p-0! [&_input]:px-3! bg-[rgba(244,244,244,0.2)]!",
          "h-fit! [&_input]:rounded-[10px]! rounded-[10px]! text-slate-gray!",
          "focus:ring-0! outline-0! ring-0! shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]!",
          "focus:shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)]!",
          "focus-within:shadow-[0px_0px_0px_2px_rgba(203,213,225,0.4)]! transition-all! duration-300! ",
          "[&_input::placeholder]:text-slate-gray! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-base!",
          className,
        )}
        style={style}
      />
    );
  },
);

CustomRadixInput.displayName = "CustomRadixInput";
export default CustomRadixInput;
