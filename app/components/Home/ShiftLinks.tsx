"use client";

import { GibbousMoonIcon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const getLinks = () => [
  {
    label: "Morning",
    href: "/",
    icon: <HugeiconsIcon size={20} icon={Sun01Icon} />,
  },
  {
    label: "Evening",
    href: "/evening",
    icon: <HugeiconsIcon size={20} icon={GibbousMoonIcon} />,
  },
];

const ShiftLinks = () => {
  const links = getLinks();

  const currentPath = usePathname();
  return (
    <ul className={`flex space-x-6 items-center bg-theme h-10`}>
      {links.map((link) => (
        <li key={link.href} className="!ml-0">
          <Link
            href={link.href}
            className={classnames("nav-link flex items-center gap-2", {
              "bg-[#F4F5FA] text-(--green-9) border-b border-(--green-9)":
                link.href.split("/")[1] === currentPath.split("/")[1],
              "text-slate-gray hover:text-(--green-9)":
                link.href.split("/")[1] !== currentPath.split("/")[1],
            })}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ShiftLinks;
