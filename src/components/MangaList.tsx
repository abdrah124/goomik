import React from "react";
import MangaCard from "./Card";
import { getMangaByCategory } from "@/lib/getData";
import CardSlider from "./CardSlider";

export default async function MangaList({
  page = "1",
  variant = "latest",
  title,
}: {
  page?: string | number;
  variant?: "latest" | "popular" | "trending";
  title?: string;
}) {
  const { data } = await getMangaByCategory(variant, Number(page), {
    revalidate: 3600,
  });

  if (data?.items?.length === 0) return null;

  return (
    <CardSlider title={title}>
      {data?.items?.map((e) => (
        <MangaCard key={e.id} data={e} />
      ))}
    </CardSlider>
  );
}
