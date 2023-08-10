"use client";
import { useAddLibraryItem } from "@/context/Library";
import { BookmarkBorder, BookmarkOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export default function LibraryAddBtn({ id }: { id: string }) {
  const addItem = useAddLibraryItem();

  return (
    <IconButton
      onClick={() => addItem(id)}
      sx={{ width: "fit-content", mr: 2 }}
    >
      <BookmarkBorder />
    </IconButton>
  );
}
