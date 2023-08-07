"use client";
import React, { useState } from "react";
import { Typography, Collapse, Button, Stack } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { ExpandMore } from "./ExpandButton";

export default function MangaDescription({ desc }: { desc: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="px-4 pt-2">
      <Stack
        direction="row"
        justifyContent="space-between"
        onClick={() => setExpanded(!expanded)}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Summary
        </Typography>
        {desc.split(".")?.length > 1 && (
          <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </Stack>
      <Typography variant="body1" paragraph mb={0} display="inline">
        {desc.split(".").slice(0, 1).join(".")
          ? desc.split(".").slice(0, 1).join(".") + "."
          : ""}
      </Typography>
      {desc.split(".").length > 1 && (
        <Collapse
          in={expanded}
          timeout="auto"
          sx={{ fontFamily: "Roboto , Helvetica , Arial ,sans-serif" }}
        >
          {desc.split(".").slice(1).join(".")}
        </Collapse>
      )}
    </div>
  );
}
