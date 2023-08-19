"use client";
import ReadingHistoryCard, {
  ReadingHistoryCardSkeleton,
} from "@/components/ReadingHistoryCard";
import SearchCardSkeleton from "@/components/SearchCardSkeleton";
import {
  useGetReadingHistory,
  ReadingHistory as ReadingHistoryType,
} from "@/context/ReadingHistoryContext";
import { config } from "@/lib/config";
import { MangaDetailFull } from "@/models/manga";
import { Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function ReadingHistory({ history }: { history: ReadingHistoryType }) {
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
    return (
      <ReadingHistoryCard
        mangaDetail={mangaDetail}
        chapterHistorId={history?.comicId}
      />
    );
}

export default function Page() {
  const readingHistory = useGetReadingHistory();

  return (
    <Stack gap={2} direction="column">
      {readingHistory.slice(0, 5).map((history) => (
        <ReadingHistory key={history?.mangaId} history={history} />
      ))}
    </Stack>
  );
}
