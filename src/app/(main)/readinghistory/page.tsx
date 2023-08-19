"use client";
import ReadingHistoryCard, {
  ReadingHistoryCardSkeleton,
} from "@/components/ReadingHistoryCard";
import HistoryGridLayout from "@/components/layout/GridLayout";
import useGetNormalHistory from "@/hooks/useGetNormalHistory";
import { config } from "@/lib/config";
import { MangaDetailFull, ReadingExtended } from "@/models/manga";
import { Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function ReadingHistory({ history }: { history: ReadingExtended }) {
  const {
    data: mangaDetail,
    isSuccess,
    isError,
    isLoading,
  } = useQuery<MangaDetailFull>({
    queryKey: ["history", history?.mangaId],
    queryFn: () =>
      axios
        .get(`${config.baseWebUrl}/api/manga/${history.mangaId}`)
        .then((res) => res.data.data)
        .catch((err) => {
          throw new Error(err);
        }),
  });

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
