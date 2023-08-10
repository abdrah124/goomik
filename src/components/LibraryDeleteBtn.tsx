"use client";
import { useDeleteLibraryItem } from "@/context/Library";
import { Bookmark, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useShowSnackbar } from "./SnackMessage";

export default function LibraryDeleteBtn({
  id,
  variant = "bookmark",
}: {
  id: string;
  variant?: "trash" | "bookmark";
}) {
  const deleteItem = useDeleteLibraryItem();
  const showSnackbar = useShowSnackbar();

  const handleDelete = () => {
    deleteItem(id);
    showSnackbar("Item removed from library!", 1500);
  };

  return (
    <IconButton
      onClick={handleDelete}
      sx={{ width: "fit-content", mr: 2, height: "fit-content" }}
    >
      {variant === "trash" ? (
        <Delete color="error" />
      ) : (
        <Bookmark color="secondary" />
      )}
    </IconButton>
  );
}
