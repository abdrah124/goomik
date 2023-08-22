import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <Stack direction="column" gap={2} p={4} alignItems="center">
      <Typography variant="h5" component="h2">
        Page not found
      </Typography>
      <Button LinkComponent={Link} href="/" variant="contained">
        Back To home?
      </Button>
    </Stack>
  );
}
