import { useAddBookmarkItem } from "@/hooks/reactquery/mutation";
import useGetMe from "@/hooks/useGetMe";
import { Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SyncItemButton() {
  const [libraryIds, setLibraryIds] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("libraryBackup") ?? "[]");
    if (items.length > 0) setLibraryIds(items);
  }, []);

  const { mutate: saveItems, isLoading } = useAddBookmarkItem();
  const me = useGetMe();
  const session = useSession();
  if (session?.status !== "authenticated")
    return <Link href="/signin">Sign in to save your saved items?</Link>;

  const handleSync = () => {
    const itemsData = libraryIds.map((item) => ({
      comicId: item,
      userId: me?.id,
    }));

    itemsData.forEach((itemData) => {
      saveItems({
        ...itemData,
      });
    });
  };

  return (
    <Button
      variant="contained"
      onClick={handleSync}
      disabled={isLoading}
      endIcon={
        isLoading ? (
          <CircularProgress color="inherit" sx={{ mx: 1 }} size={20} />
        ) : (
          ""
        )
      }
    >
      Sync saved item
    </Button>
  );
}
