"use client";

import { Dispatch, SetStateAction } from "react";

const MapWrapper = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div
      style={{
        position: "relative",
        zIndex: "2",
      }}
    >
      <div className="flex justify-center">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] md:w-8/12 lg:w-[600px]">
          {/* <MyMap /> */}
        </div>
      </div>
    </div>
  );
};

export default MapWrapper;
