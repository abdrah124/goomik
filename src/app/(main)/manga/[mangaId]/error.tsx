"use client";

import { Refresh } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Stack direction="column" gap={2} p={4} alignItems="center">
      <Typography variant="h5" component="h2">
        Something went wrong!
      </Typography>
      <Button LinkComponent={Link} href="/" variant="contained">
        Back To home?
      </Button>
      <Button
        variant="contained"
        onClick={() => router.refresh()}
        startIcon={<Refresh />}
      >
        Refresh
      </Button>
    </Stack>
  );
}
