"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const NavbarToggle = () => {
  const currentPath = usePathname();

  if (
    currentPath !== "/login" &&
    currentPath !== "/privacy-policy" &&
    currentPath !== "/update-location" &&
    currentPath !== "/update-location-dastarkhawan" &&
    currentPath !== "/new-location-dastarkhawan" &&
    currentPath !== "/new-location"
  ) {
    return <Navbar />;
  }
  // else {
  //   return <div style={{ height: "68px" }}></div>;
  // }
};

export default NavbarToggle;
