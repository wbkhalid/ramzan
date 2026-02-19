"use client";
import { usePathname } from "next/navigation";
import useBackground from "./useBackground";

const BgChanger = () => {
  const currentPath = usePathname();

  const pagePathsForBgImage = [
    "login",
    "update-location",
    "new-location",
    "update-location-dastarkhawan",
    "new-location-dastarkhawan",
  ];

  const pathSegment = currentPath.split("/")[1]; // e.g., "sectors"
  const isImagePath = pagePathsForBgImage.includes(pathSegment);
  // #CFE6F8
  useBackground(
    isImagePath ? "/images/bg.png" : "#F4F5FA",
    isImagePath, // true if it's an image, false if it's a color
  );

  return <></>; // empty component just to trigger hook
};

export default BgChanger;
