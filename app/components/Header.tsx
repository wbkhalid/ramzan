"use client";

import { ChartRoseIcon, Upload03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const headerOption = [
    {
      label: "Daily Submission",
      icon: Upload03Icon,
      route: "/",
    },
    {
      label: "Reports",
      icon: ChartRoseIcon,
      route: "/single-report",
    },
  ];

  return (
    <div className="bg-white border-b border-[#E2E1E2] px-1 lg:px-25">
      <div className="flex gap-2">
        {headerOption?.map((option) => {
          const isActive = pathname === option.route;

          return (
            <Link
              href={option.route}
              key={option.route}
              className={`flex gap-2 items-center p-2.5 text-sm font-semibold
                ${isActive ? "text-[#008D44]" : "text-[#606060]"}
              `}
            >
              <HugeiconsIcon icon={option?.icon} size={20} />
              <p>{option.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
