import { Divider, Typography } from "@mui/material";
import React from "react";
import ClearHistoryBtn from "./ClearHistoryBtn";
import ReadingHistoryProvider from "@/context/ReadingHistoryContext";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "Gooscans - Reading History",
  description: "Search your manga, manhua, manhwa, by reading history here",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full p-4">
      <ReadingHistoryProvider>
        <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 2 }}>
          Reading History
        </Typography>
        {children}
        <Divider sx={{ my: 2 }} />
        <ClearHistoryBtn />
      </ReadingHistoryProvider>
    </main>
  );
}
