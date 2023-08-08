"use client";
import { useScroll } from "@/hooks/useScroll";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React from "react";

export default function BackToTopBtn() {
  const scroll = useScroll();

  const handleToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <Fab
      size="medium"
      color="secondary"
      aria-label="add"
      onClick={handleToTop}
      sx={{
        position: "fixed",
        right: 14,
        bottom: 14,
        scale: scroll > 100 ? 1 : 0,
        transition: "all .2s",
      }}
    >
      <KeyboardArrowUp />
    </Fab>
  );
}
