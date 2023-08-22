"use client";
import ReadingHistoryCard, {
  ReadingHistoryCardSkeleton,
} from "@/components/ReadingHistoryCard";
import HistoryGridLayout from "@/components/layout/GridLayout";
import { useGetMangaDetail } from "@/hooks/reactquery/query";
import useGetNormalHistory from "@/hooks/useGetNormalHistory";
import { ReadingExtended } from "@/models/manga";
import React from "react";

function ReadingHistory({ history }: { history: ReadingExtended }) {
  const {
    data: mangaDetail,
    isSuccess,
    isError,
    isLoading,
  } = useGetMangaDetail(history.mangaId);

  if (isLoading) return <ReadingHistoryCardSkeleton />;

  if (isError) return null;

  if (isSuccess)
    return <ReadingHistoryCard mangaDetail={mangaDetail} history={history} />;
}

export default function Page() {
  const normalHistory = useGetNormalHistory();

  return (
    <HistoryGridLayout>
      {normalHistory
        .map((item) => ({ ...item, chapters: item.chapters.slice(0, 5) }))
        .slice(0, 5)
        .map((history) => (
          <ReadingHistory key={history?.mangaId} history={history} />
        ))}
    </HistoryGridLayout>
  );
}
