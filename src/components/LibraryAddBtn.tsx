"use client";
import { useAddLibraryItem } from "@/context/Library";
import { BookmarkBorder, BookmarkOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useShowSnackbar } from "./SnackMessage";
import useAddBookmark from "@/hooks/useAddBookmark";
import { useSession } from "next-auth/react";
import useGetMe from "@/hooks/useGetMe";

export default function LibraryAddBtn({ id }: { id: string }) {
  const addItem = useAddLibraryItem();
  const showSnackbar = useShowSnackbar();
  const saveItem = useAddBookmark();
  const session = useSession();
  const me = useGetMe();

  const handleAdd = () => {
    if (session.status === "authenticated" && me) {
      saveItem({ userId: me?.id, comicId: id });
    }
    addItem(id);
    showSnackbar("Item added to library", 1500);
  };

  return (
    <IconButton
      onClick={handleAdd}
      sx={{ width: "fit-content", mr: 2, height: "fit-content" }}
    >
      <BookmarkBorder />
    </IconButton>
  );
}
