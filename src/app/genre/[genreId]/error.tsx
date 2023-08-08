"use client";

import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Stack direction="column" gap={2} p={4} alignItems="center">
      <Typography variant="h5" component="h2">
        Something went wrong!
      </Typography>
      <Button onClick={() => reset()} variant="contained">
        Refresh
      </Button>
    </Stack>
  );
}
