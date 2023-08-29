import { getMangaDetail } from "@/lib/getData";
import { Stack, Typography, Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import GenreBadges from "./GenreBadges";
import MangaDetailTab from "./MangaDetailTab";
import { redirect } from "next/navigation";

export default async function MangaDetail({ mangaId }: { mangaId: string }) {
  const { data: mangaDetails } = await getMangaDetail(mangaId, {
    revalidate: 100,
  });

  if (!mangaDetails && mangaId.includes("online-reading"))
    redirect(`/manga/${mangaId.split("-online-reading")[0]}`);

  const { src, width, height } = mangaDetails.cover_image || {};
  return (
    <Stack
      direction="column"
      alignItems="start"
      justifyContent="start"
      marginX="auto"
      width="100%"
    >
      <Stack direction="row" gap={2} paddingY={1}>
        <div className="pl-3">
          <Image
            src={src}
            width={width}
            height={height}
            alt={mangaDetails?.title}
            className="rounded-md max-w-[120px] h-auto shadow-md min-w-[110px] shadow-[rgba(0,0,0,.3)]"
            unoptimized
          />
        </div>
        <Stack direction="column" gap={1} width="70%" pr={1}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 600 }}
          >
            {mangaDetails?.title}
          </Typography>
          <Typography variant="caption" component="p" sx={{ fontSize: 14 }}>
            <span className="font-bold">Authors:</span> {mangaDetails?.authors}
          </Typography>
          <Typography variant="caption" component="p" sx={{ fontSize: 14 }}>
            <span className="font-semibold">Artists:</span>{" "}
            {mangaDetails?.artists}
          </Typography>
          <Typography variant="caption" component="p" sx={{ fontSize: 14 }}>
            <span className="font-semibold">Status:</span>{" "}
            {mangaDetails?.status}
          </Typography>

          <Stack direction="row" alignItems="center" gap={1}>
            <Rating
              value={mangaDetails?.rating}
              sx={{ fontSize: 19 }}
              readOnly
              precision={0.5}
            />
            <Typography
              variant="caption"
              component="p"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              {mangaDetails?.rating} / 5
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        gap={1}
        width="100%"
        mt={2}
        paddingX={1}
        className="hide-scrollbar"
        sx={{ overflowX: "auto" }}
      >
        <GenreBadges
          color="primary"
          fontSize={12}
          genres={mangaDetails?.genres as string[]}
        />
      </Stack>

      <MangaDetailTab mangaDetails={mangaDetails} />
    </Stack>
  );
}
