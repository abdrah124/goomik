import { getMangaChapter } from "@/lib/getData";
import ChapterImage from "@/components/ChapterImage";
import React, { Suspense } from "react";
import CardSkeleton from "./CardSkeleton";

interface Props {
  mangaId: string;
  chapterId: string;
}

export default async function ChapterPage({ mangaId, chapterId }: Props) {
  const { data } = await getMangaChapter(mangaId, chapterId, { revalidate: 0 });

  return (
    <div>
      {data?.images?.map((e, i) => (
        <ChapterImage image={e} index={i} key={e} />
      ))}
    </div>
  );
}
