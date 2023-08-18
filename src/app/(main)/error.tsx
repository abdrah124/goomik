"use client";

import { Button, Stack, Typography } from "@mui/material";
import React from "react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Stack direction="column" gap={2} p={4} alignItems="center">
      <Typography variant="h5" component="h2">
        Something went wrong!
      </Typography>
      <Button onClick={() => reset()} href="/" variant="contained">
        Restore?
      </Button>
    </Stack>
  );
}
