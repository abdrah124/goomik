"use client";
import { Refresh } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function Error() {
  const router = useRouter();
  return (
    <div className="p-4 my-8 text-center w-full flex flex-col gap-4">
      <Typography variant="h3">Something went wrong!</Typography>
      <Button
        variant="contained"
        onClick={() => router.refresh()}
        startIcon={<Refresh />}
      >
        Refresh
      </Button>
    </div>
  );
}
