import BookmarkPage from "@/components/dashboard/bookmark/BookmarkPage";
import UserBookmarksCard from "@/components/dashboard/bookmark/UserBookmarksCard";
import prisma from "@/lib/prismadb";
import { UserBookmark, UserWithBookmarks } from "@/models/user";
import { Box, Grid, Paper } from "@mui/material";
import React from "react";

export default async function Page() {
  const usersLibrary = await prisma.user.findMany({
    select: {
      bookmarks: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return (
    <Grid item xs={12}>
      <BookmarkPage usersLibrary={usersLibrary} />
    </Grid>
  );
}
