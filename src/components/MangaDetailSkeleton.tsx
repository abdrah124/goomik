import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function MangaDetailSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        marginTop: 4,
      }}
    >
      <Skeleton
        width="80%"
        variant="rounded"
        sx={{ maxWidth: 193, height: 25, marginBottom: 1 }}
      />
      <Skeleton
        width="90%"
        variant="rounded"
        sx={{
          maxWidth: 193,
          minHeight: 171,
          maxHeight: 278,
          height: "100%",
          aspectRatio: "7 / 16",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: 4,
          gap: 2,
          marginY: 4,
          width: "100%",
        }}
      >
        <Skeleton width="70%" />
        <Skeleton width="70%" />
        <Skeleton width="70%" />
        <Skeleton width="70%" />
        <Skeleton width="70%" />
      </Box>
    </Box>
  );
}
