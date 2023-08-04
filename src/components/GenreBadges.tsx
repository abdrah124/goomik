import { Chip } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function GenreBadges({ genres = [] }: { genres: string[] }) {
  if (genres?.length === 0) return "";

  return (
    <div className="flex gap-1 justify-end flex-wrap">
      {genres.map((e) => (
        <Link href={`/genre/${e.toLowerCase()}`} key={e}>
          <Chip label={e} size="small" color="info" sx={{ fontSize: 12 }} />
        </Link>
      ))}
    </div>
  );
}
