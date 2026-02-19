import { PropsWithChildren } from "react";
import AppBrand from "./Navbar/AppBrand";
import Navbar from "./Navbar/Navbar";

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[auto_1fr] bg-linear-to-b from-[#020618] via-[#0D1527] to-[#020618]">
      {/* Sidebar */}
      <aside className="row-span-2 border border-white/10 bg-theme backdrop-blur-md ps-5 pe-4.25">
        <div className="hidden md:block -ms-5 -me-4.25 py-5.75 px-6.25 border-b border-white/10 ">
          <AppBrand />
        </div>
        {/* <SidebarContent /> */}
      </aside>
      {/* Header */}
      <header className="py-[21.5px] px-6.25 border-b h-fit border-white/10 bg-theme">
        <Navbar />
      </header>

      {/* Content */}
      <main className="py-5 px-6.25">{children}</main>
    </div>
  );
}
