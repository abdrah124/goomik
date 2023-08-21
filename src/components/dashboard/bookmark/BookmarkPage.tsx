"use client";

import { UserBookmark } from "@/models/user";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import UserBookmarksCard from "./UserBookmarksCard";
import { Search } from "@mui/icons-material";

export default function BookmarkPage({
  usersLibrary,
}: {
  usersLibrary: UserBookmark[];
}) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          mb: 2,
          ml: 3,
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search user"
          inputProps={{ "aria-label": "search user" }}
          value={searchInput}
          onChange={(e) => {
            e.preventDefault();
            setSearchInput(e.target.value);
          }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
      </Paper>
      <Box sx={{ width: "100%", p: 3, gap: 4, display: "grid" }}>
        {usersLibrary
          ?.filter((user) =>
            user.name?.toLowerCase().includes(searchInput.toLowerCase())
          )
          ?.map((user) => (
            <UserBookmarksCard key={user?.email ?? ""} data={user} />
          ))}
      </Box>
    </>
  );
}
