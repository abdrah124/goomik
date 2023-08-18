import { Typography } from "@mui/material";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full p-4">
      <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 2 }}>
        Library
      </Typography>
      {children}
    </main>
  );
}
