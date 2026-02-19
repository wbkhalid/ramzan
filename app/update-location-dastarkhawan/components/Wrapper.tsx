import { PropsWithChildren } from "react";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        position: "relative",
        zIndex: "2",
      }}
    >
      <div className="flex justify-center">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] md:w-8/12 lg:w-[856px] bg-blur-3 border border-[rgba(203,213,225,0.2)] rounded-[30px] px-7.5 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
