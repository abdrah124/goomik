"use client";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: { fontFamily: "var(--cabin)" },
});

import React from "react";

export default function SearchCardTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
