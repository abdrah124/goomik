"use client";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function ChapterImage({
  image,
  index,
}: {
  image: string;
  index: number;
}) {
  const [reveal, setReveal] = React.useState(false);

  return (
    <>
      {!reveal && (
        <Skeleton
          variant="rounded"
          sx={{ width: "100%", height: "auto", aspectRatio: "6 / 14" }}
        />
      )}
      <Image
        src={image}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: 600,
          minWidth: 300,
        }}
        width={400}
        height={400}
        alt={`Images ${index}`}
        onError={() => setReveal(true)}
        onLoadingComplete={() => setReveal(true)}
      />
    </>
  );
}
