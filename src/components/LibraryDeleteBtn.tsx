"use client";
import { useDeleteLibraryItem } from "@/context/Library";
import { Bookmark, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useShowSnackbar } from "./SnackMessage";
import { useConfirm } from "material-ui-confirm";
import useRemoveBookmark from "@/hooks/useRemoveBookmark";
import { useSession } from "next-auth/react";
import useGetMe from "@/hooks/useGetMe";

export default function LibraryDeleteBtn({
  id,
  variant = "bookmark",
}: {
  id: string;
  variant?: "trash" | "bookmark";
}) {
  const deleteItem = useDeleteLibraryItem();
  const showSnackbar = useShowSnackbar();
  const confirm = useConfirm();
  const session = useSession();
  const removeItem = useRemoveBookmark(id);

  const handleDelete = async () => {
    await confirm({
      title: "Delete",
      description: "Delete this bookmarked item from library?",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
      confirmationText: "Delete",
    });
    if (session?.status === "authenticated") {
      removeItem();
    }
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
