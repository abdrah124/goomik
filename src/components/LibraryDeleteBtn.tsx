"use client";
import { useDeleteLibraryItem } from "@/context/Library";
import { Bookmark, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export default function LibraryDeleteBtn({
  id,
  variant = "bookmark",
}: {
  id: string;
  variant?: "trash" | "bookmark";
}) {
  const deleteItem = useDeleteLibraryItem();

  return (
    <IconButton
      onClick={() => deleteItem(id)}
      sx={{ width: "fit-content", mr: 2 }}
    >
      {variant === "trash" ? (
        <Delete color="error" />
      ) : (
        <Bookmark color="secondary" />
      )}
    </IconButton>
  );
}
