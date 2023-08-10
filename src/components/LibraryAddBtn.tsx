"use client";
import { useAddLibraryItem } from "@/context/Library";
import { BookmarkBorder, BookmarkOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useShowSnackbar } from "./SnackMessage";

export default function LibraryAddBtn({ id }: { id: string }) {
  const addItem = useAddLibraryItem();
  const showSnackbar = useShowSnackbar();

  const handleAdd = () => {
    addItem(id);
    showSnackbar("Item added to library", 1500);
  };

  return (
    <IconButton onClick={handleAdd} sx={{ width: "fit-content", mr: 2 }}>
      <BookmarkBorder />
    </IconButton>
  );
}
