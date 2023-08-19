import { MangaDetailFull } from "@/models/manga";
import { Divider, Stack, Typography, Skeleton, Paper } from "@mui/material";
import Image from "next/image";
import React from "react";
import LinkNext from "next/link";
import { config } from "@/lib/config";
import { mangaSingleChapter } from "@/lib/apiEndpoint";
import Link from "next/link";
import getDate from "@/lib/getDate";
import { ReadingHistory } from "@/context/ReadingHistoryContext";

function SkeletonWave(props: any) {
  return <Skeleton animation="wave" {...props} />;
}

export function ReadingHistoryCardSkeleton() {
  return (
    <Stack
      direction="column"
      gap={2}
      maxWidth={768}
      component={Paper}
      elevation={6}
      p={3}
    >
      <SkeletonWave width="70%" />
      <Divider />
      <Stack direction="row" gap={2}>
        <SkeletonWave width={100} height={150} variant="rounded" />
        <Stack direction="column" gap={2} width="70%">
          <SkeletonWave width="50%" />
          <SkeletonWave width="50%" />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function ReadingHistoryCard({
  mangaDetail,
  history,
}: {
  mangaDetail: MangaDetailFull;
  history: ReadingHistory;
}) {
  const chapterHistory = mangaDetail?.chapter_list?.find(
    (chapter) => chapter?.id === history.chapter
  );

  return (
    <Stack
      component={Paper}
      elevation={6}
      direction="column"
      gap={2}
      maxWidth={768}
      p={3}
    >
      <Typography
        variant="h6"
        fontSize={16}
        fontWeight={700}
        noWrap
        component="h2"
      >
        {mangaDetail?.title}
      </Typography>
      <Divider />
      <Stack
        direction="row"
        gap={2}
        component={Link}
        href={`${config.baseWebUrl}/manga/${mangaDetail?.id}/${history?.chapter}`}
      >
        <Image
          src={mangaDetail?.cover_image?.src}
          width={100}
          height={150}
          className="rounded-md"
          alt={mangaDetail?.title}
        />
        <Stack direction="column" gap={2}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {history.chapter[0].toUpperCase() +
              history.chapter?.slice(1)?.split("-").join(" ")}
          </Typography>
          <Typography variant="subtitle2">{mangaDetail?.artists}</Typography>
          <Typography variant="subtitle2">{mangaDetail?.authors}</Typography>
          <Typography variant="subtitle2">
            {getDate(history.createdAt as number)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
