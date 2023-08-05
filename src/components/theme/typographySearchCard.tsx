"use client";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    h5: {
      fontFamily: "var(--cabin), var(--poppins), Arial, Helvetica",
      fontWeight: 700,
    },
    h6: { fontFamily: "var(--cabin), var(--poppins), Arial, Helvetica" },
    caption: {
      fontSize: 14,
      fontFamily: "Arial, var(--roboto), Helvetica",
      fontWeight: 500,
    },
  },
});

import React from "react";

export default function SearchCardTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
