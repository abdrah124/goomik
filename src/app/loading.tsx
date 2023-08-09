import { CardSliderSkeleton } from "@/components/CardSlider";
import React from "react";

export default function Loading() {
  return (
    <main>
      <div className="gap-2 flex flex-col">
        <CardSliderSkeleton />
        <CardSliderSkeleton />
        <CardSliderSkeleton />
        <CardSliderSkeleton />
      </div>
    </main>
  );
}
