"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Header from "../Header";

const NavbarToggle = () => {
  const currentPath = usePathname();

  const showHeader = currentPath === "/" || currentPath === "/single-report";

  const hideNavbar =
    currentPath === "/login" ||
    currentPath === "/privacy-policy" ||
    currentPath === "/update-location" ||
    currentPath === "/update-location-dastarkhawan" ||
    currentPath === "/new-location-dastarkhawan" ||
    currentPath === "/new-location";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {showHeader && <Header />}
    </>
  );
};

export default NavbarToggle;
