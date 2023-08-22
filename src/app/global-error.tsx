"use client";

import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function GlobalError() {
  return (
    <Stack direction="column" gap={2} p={4} alignItems="center">
      <Typography variant="h5" component="h2">
        Something went wrong!
      </Typography>
      <Button component={Link} href="/" variant="contained">
        Back to home?
      </Button>
    </Stack>
  );
}
