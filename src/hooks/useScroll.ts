"use client";
import { useState, useEffect } from "react";

export const useScroll: () => number = () => {
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    const scrolling = () => {
      setScroll(window.scrollY);
    };

    if (window !== undefined) {
      window.addEventListener("scroll", scrolling);
    }

    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, []);

  return scroll;
};
