"use client";

import { useSetReadingHistory } from "@/context/ReadingHistoryContext";
import { Button } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React from "react";

export default function ClearHistoryBtn() {
  const { clearReadingHistory } = useSetReadingHistory();
  const confirm = useConfirm();

  const handleClear = async () => {
    await confirm({
      title: "Clear History",
      description:
        "Clear your reading history? once cleared you cannot retrieve it anymore",
      confirmationButtonProps: { variant: "contained", color: "error" },
      confirmationText: "Clear",
      cancellationButtonProps: { variant: "outlined" },
    });
    clearReadingHistory();
  };

  return (
    <Button onClick={handleClear} variant="contained" color="warning">
      Clear history
    </Button>
  );
}
