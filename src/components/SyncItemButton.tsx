import { useGetLibraryItems } from "@/context/Library";
import useGetMe from "@/hooks/useGetMe";
import { config } from "@/lib/config";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useMutation } from "react-query";

export default function SyncItemButton() {
  const { mutate: saveItems, isLoading } = useMutation({
    mutationFn: (data: { comicId: string; userId: string | undefined }) =>
      axios
        .post(`${config.baseWebUrl}/api/bookmark`, data)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
  });
  const libraryIds = useGetLibraryItems();
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
