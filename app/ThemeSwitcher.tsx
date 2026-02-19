"use client";

import { Theme } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const ThemeSwitcher = ({ children }: PropsWithChildren) => {
  const currentPath = usePathname();
  return (
    <Theme
      panelBackground="translucent"
      accentColor="gray"
      radius="large"
      appearance="light"
      hasBackground={
        currentPath === "/login" ||
        currentPath === "/update-location" ||
        currentPath === "/new-location" ||
        currentPath === "/update-location-dastarkhawan" ||
        currentPath === "/new-location-dastarkhawan" ||
        currentPath === "/" ||
        currentPath === "/evening"
          ? false
          : true
      }
    >
      {children}
    </Theme>
  );
};

export default ThemeSwitcher;
