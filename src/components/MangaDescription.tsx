"use client";
import React, { useState } from "react";
import { Typography, Collapse, Button, Stack } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { ExpandMore } from "./ExpandButton";

export default function MangaDescription({ desc }: { desc: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="px-2">
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
        <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
          <ExpandMoreIcon />
        </ExpandMore>
      </Stack>
      <Typography
        variant="body1"
        paragraph
        mb={0}
        display="inline"
        sx={{ fontFamily: "Arial, var(--roboto), Helvetica" }}
      >
        {desc.split(".").slice(0, 1).join(".")
          ? desc.split(".").slice(0, 1).join(".") + "."
          : ""}
      </Typography>
      {desc.length > 100 && (
        <Collapse
          in={expanded}
          sx={{ fontFamily: "Arial, var(--roboto), Helvetica" }}
          timeout="auto"
          // @ts-ignore
          variant="body1"
        >
          {desc.split(".").slice(1).join(".")}
        </Collapse>
      )}
      {/* <Typography
        onClick={() => setExpanded(!expanded)}
        component={"button"}
        sx={{ fontWeight: 700 }}
        variant="caption"
      >
        {expanded ? "Show less" : "Show more"}
      </Typography> */}
    </div>
  );
}
