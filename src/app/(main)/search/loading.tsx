import React from "react";
import { Box } from "@mui/material";
import SearchCardSkeleton from "@/components/SearchCardSkeleton";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: 3,
        width: "100%",
        maxWidth: 768,
        marginX: "auto",
      }}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <SearchCardSkeleton key={item} />
      ))}
    </Box>
  );
}
