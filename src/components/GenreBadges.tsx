import { Chip } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function GenreBadges({
  genres = [],
  size,
  color,
  fontSize = 16,
}: {
  genres: string[];
  size?: "small" | "medium";
  color?:
    | "default"
    | "info"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning";
  fontSize?: number;
}) {
  if (genres?.length === 0) return "";

  return (
    <>
      {genres.map((e) => (
        <Link href={`/genre/${e.toLowerCase()}`} key={e}>
          <Chip
            label={e}
            size={size}
            color={color}
            sx={{ fontSize, fontFamily: "var(--poppins)", fontWeight: 700 }}
          />
        </Link>
      ))}
    </>
  );
}
("Arial, var(--roboto), Helvetica");
