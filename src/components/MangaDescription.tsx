"use client";
import React, { useState } from "react";
import { Typography, Collapse, Button } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { ExpandMore } from "./ExpandButton";

export default function MangaDescription({ desc }: { desc: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Typography variant="body1" paragraph mb={0} display="inline">
        {desc.split(".").slice(0, 1).join(".")
          ? desc.split(".").slice(0, 1).join(".") + "."
          : ""}
      </Typography>
      {desc.length > 100 && (
        <Collapse
          in={expanded}
          timeout="auto"
          // @ts-ignore
          variant="body1"
        >
          {desc.split(".").slice(1).join(".")}
        </Collapse>
      )}
      <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
        <ExpandMoreIcon />
      </ExpandMore>
      <Typography
        onClick={() => setExpanded(!expanded)}
        component={"button"}
        variant="button"
      >
        {expanded ? "Show less" : "Show more"}
      </Typography>
    </div>
  );
}
