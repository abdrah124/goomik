import React from "react";
import CardGrid from "./CardGrid";
import MangaCard from "./Card";
import { getMangaByCategory } from "@/lib/getData";
import MangaPagination from "./MangaPagination";

export default async function MangaList({ l = "1" }: { l: string }) {
  const { data } = await getMangaByCategory("latest", Number(l), {
    revalidate: 0,
  });

  return (
    <>
      <CardGrid>
        {data.items.map((e) => (
          <MangaCard key={e.id} data={e} />
        ))}
      </CardGrid>
      <MangaPagination total={data.total} sParams="l" />
    </>
  );
}
