import { Card, Skeleton, Stack } from "@mui/material";
import React from "react";
import CardGrid from "./CardGrid";

export default function CardSkeleton() {
  return (
    <Card
      sx={{
        minWidth: { xs: 140, sm: 170 },
        height: { xs: 278, xxs: 300, sm: 340, lg: 360, xl: 380 },
        boxShadow: "none",
      }}
    >
      <Skeleton variant="rectangular" height={"70%"} />
      <Stack direction="column" gap={1} mt={1}>
        <Skeleton />
        <Skeleton width={"50%"} />
      </Stack>
    </Card>
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
