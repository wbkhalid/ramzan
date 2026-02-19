"use client";
import { useEffect } from "react";

const useBackground = (background: string, isImage: boolean = false) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isImage) {
      document.body.style.backgroundImage = `url('${background}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundColor = ""; // reset color
    } else {
      document.body.style.background = background;
      document.body.style.backgroundImage = ""; // reset image
    }

    // cleanup: only run on component unmount
    return () => {
      document.body.style.background = "";
      document.body.style.backgroundImage = "";
    };
  }, [background, isImage]);
};

export default useBackground;
