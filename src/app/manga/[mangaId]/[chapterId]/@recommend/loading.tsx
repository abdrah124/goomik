import CardGrid from "@/components/CardGrid";
import CardSkeleton from "@/components/CardSkeleton";
import React from "react";

export default function Loading() {
  return (
    <CardGrid>
      {[1, 2, 3, 4, 5, 6].map((e) => (
        <CardSkeleton key={e} />
      ))}
    </CardGrid>
  );
}
