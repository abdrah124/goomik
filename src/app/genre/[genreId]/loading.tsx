import CardGrid from "@/components/CardGrid";
import CardSkeleton from "@/components/CardSkeleton";
import { Box } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Box p={2}>
      <CardGrid>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <CardSkeleton key={item} />
        ))}
      </CardGrid>
    </Box>
  );
}
