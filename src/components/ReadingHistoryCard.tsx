"use client";
import { MangaDetailFull, ReadingExtended } from "@/models/manga";
import {
  Divider,
  Stack,
  Typography,
  Skeleton,
  Paper,
  Collapse,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { config } from "@/lib/config";
import Link from "next/link";
import getDate from "@/lib/getDate";
import { ExpandMore } from "./ExpandButton";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

function getChapterString(chapterId: string = ""): string {
  return chapterId[0].toUpperCase() + chapterId.slice(1)?.split("-").join(" ");
}

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
  history: ReadingExtended;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Stack
        component={Paper}
        elevation={6}
        direction="column"
        gap={2}
        height="fit-content"
        maxWidth={768}
        p={3}
      >
        <Typography
          variant="h6"
          fontSize={16}
          fontWeight={700}
          noWrap
          component={Link}
          href={`${config.baseWebUrl}/manga/${mangaDetail?.id}`}
        >
          {mangaDetail?.title}
        </Typography>
        <Divider />
        <Stack direction="row" gap={2} sx={{ position: "relative" }}>
          <Image
            src={mangaDetail?.cover_image?.src}
            width={100}
            height={150}
            className="rounded-md"
            alt={mangaDetail?.title}
          />
          <Stack direction="column" gap={2}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1 }}
              component={Link}
              href={`${config.baseWebUrl}/manga/${mangaDetail?.id}/${history?.chapters[0].chapterId}`}
            >
              Last read: {getChapterString(history.chapters[0].chapterId)}
            </Typography>
            <Typography variant="subtitle2">{mangaDetail?.artists}</Typography>
            <Typography variant="subtitle2">{mangaDetail?.authors}</Typography>
            <Typography variant="subtitle2">
              {getDate(history.chapters[0].createdAt as number)}
            </Typography>
          </Stack>
          <div className="absolute bottom-0 right-0">
            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
        </Stack>
        <Collapse
          in={expanded}
          timeout={200}
          easing={{ enter: "easeinout", exit: "easeinout" }}
        >
          <List dense>
            {history.chapters.map((item) => (
              <ListItem
                disablePadding
                key={item.chapterId}
                component={Link}
                href={`${config.baseWebUrl}/manga/${mangaDetail?.id}/${item?.chapterId}`}
              >
                <ListItemText
                  primary={getChapterString(item.chapterId)}
                  secondary={getDate(item.createdAt as number)}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Stack>
    </>
  );
}
