"use client";

import useAssignedLocations from "@/app/react-query/hooks/ramzan-monitoring/useAssignedLocations";
import { Upload03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import classnames from "classnames";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  userId: string;
  setSelectedBazarId: Dispatch<SetStateAction<number | undefined>>;
  selectedBazarId: number | undefined;
}

const BazarLinks = ({ userId, selectedBazarId, setSelectedBazarId }: Props) => {
  const { data, isLoading, isFetching } = useAssignedLocations(userId);

  const links = data?.map((d) => {
    return {
      label: d.name,
      value: d.id,
      icon: <HugeiconsIcon size={20} icon={Upload03Icon} />,
    };
  });

  useEffect(() => {
    if (links && links.length > 0) {
      setSelectedBazarId(links[0].value);
    }
  }, [links]);

  return (
    <ul
      className={`flex space-x-6 items-center bg-theme h-10 py-5 px-2 sm:px-10 lg:px-12.5 xl:px-25 `}
    >
      {links?.map((link, i) => (
        <li key={i} className="!ml-0">
          <span
            onClick={() => setSelectedBazarId(link.value)}
            className={classnames("nav-link flex items-center gap-2", {
              "bg-[#F4F5FA] text-dark-blue border-b border-dark-blue":
                link.value === selectedBazarId,
              "text-slate-gray hover:text-dark-blue":
                link.value !== selectedBazarId,
            })}
          >
            {link.icon}
            <span>{link.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default BazarLinks;
