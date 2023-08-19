import { MangaDetailFull } from "@/models/manga";
import { Divider, Stack, Typography, Skeleton } from "@mui/material";
import Image from "next/image";
import React from "react";
import LinkNext from "next/link";
import { config } from "@/lib/config";

function SkeletonWave(props: any) {
  return <Skeleton animation="wave" {...props} />;
}

export function ReadingHistoryCardSkeleton() {
  return (
    <Stack direction="column" gap={2} maxWidth={768}>
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
  chapterHistorId,
}: {
  mangaDetail: MangaDetailFull;
  chapterHistorId: string;
}) {
  const chapterHistory = mangaDetail?.chapter_list?.find(
    (chapter) => chapter?.id === chapterHistorId
  );

  return (
    <Stack
      direction="column"
      gap={2}
      maxWidth={768}
      component={LinkNext}
      href={`${config.baseWebUrl}/manga/${mangaDetail?.id}/${chapterHistory?.id}`}
    >
      <Typography variant="h6" fontSize={16} fontWeight={700} noWrap>
        {mangaDetail?.title}
      </Typography>
      <Divider />
      <Stack direction="row" gap={2}>
        <Image
          src={mangaDetail?.cover_image?.src}
          width={100}
          height={150}
          className="rounded-md"
          alt={mangaDetail?.title}
        />
        <Stack direction="column" gap={2}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {chapterHistorId[0].toUpperCase() +
              chapterHistorId?.slice(1)?.split("-").join(" ")}
          </Typography>
          <Typography variant="subtitle2">{mangaDetail?.artists}</Typography>
          <Typography variant="subtitle2">{mangaDetail?.authors}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
