"use client";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    h5: {
      // fontFamily: "var(--cabin), var(--poppins), Arial, Helvetica",
      fontWeight: 600,
    },
    // h6: { fontFamily: "var(--cabin), var(--poppins), Arial, Helvetica" },
    caption: {
      fontSize: 14,
      // fontFamily: "Arial, var(--roboto), Helvetica",
      fontWeight: 500,
    },
  },
});

import React from "react";

export default function MangagDetailTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
