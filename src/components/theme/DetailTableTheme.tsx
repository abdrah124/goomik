"use client";
import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    mode: "dark",
  },
});

export function DetailTableTheme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
