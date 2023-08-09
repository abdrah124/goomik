import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";
import CardGrid from "./CardGrid";

export default function CardSkeleton() {
  return (
    <Box
      sx={{
        minWidth: { xs: 140, sm: 170 },
        height: { xs: 278, xxs: 300, sm: 340, lg: 360, xl: 380 },
        boxShadow: "none",
      }}
    >
      <Skeleton variant="rectangular" animation="wave" height={"70%"} />
      <Stack direction="column" gap={1} mt={1}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width={"50%"} />
      </Stack>
    </Box>
  );
}

export function CardSkeletonList() {
  return (
    <CardGrid>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e) => (
        <CardSkeleton key={e} />
      ))}
    </CardGrid>
  );
}
