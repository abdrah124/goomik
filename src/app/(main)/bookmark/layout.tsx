import { MangaLibraryProvider } from "@/context/Library";
import { Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metaData: Metadata = {
  title: "Gooscans - Bookmark",
  description: "Your saved or bookmarked comic, manhwa, manga",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full p-4">
      <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 2 }}>
        Library
      </Typography>
      <MangaLibraryProvider>{children}</MangaLibraryProvider>
    </main>
  );
}
