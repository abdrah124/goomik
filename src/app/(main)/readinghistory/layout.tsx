import { Divider, Typography } from "@mui/material";
import React from "react";
import ClearHistoryBtn from "./ClearHistoryBtn";
import ReadingHistoryProvider from "@/context/ReadingHistoryContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full p-4">
      <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 2 }}>
        Reading History
      </Typography>
      <ReadingHistoryProvider>{children}</ReadingHistoryProvider>
      <Divider sx={{ my: 2 }} />
      <ClearHistoryBtn />
    </main>
  );
}
