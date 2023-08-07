import { getMangaDetail } from "@/lib/getData";
import { Stack, Typography, Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import MangaDetailTheme from "./theme/MangaDetailTheme";
import GenreBadges from "./GenreBadges";
import MangaDetailTab from "./MangaDetailTab";
import PageBreadcrumbs from "./Breadcrumbs";
import { redirect } from "next/navigation";
import { getPathname } from "@/lib/getPathname";

export default async function MangaDetail({ mangaId }: { mangaId: string }) {
  const { data: mangaDetails } = await getMangaDetail(mangaId, {
    revalidate: 0,
  });

  if (!mangaDetails && mangaId.includes("online-reading"))
    redirect(`/manga/${mangaId.split("-online-reading")[0]}`);

  const { src, width, height } = mangaDetails?.cover_image || {};
  return (
    <MangaDetailTheme>
      <Stack
        direction="column"
        alignItems="start"
        justifyContent="start"
        marginX="auto"
        width="100%"
        maxWidth={768}
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
          <Stack direction="column" gap={1} width="70%" px={1}>
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
            >
              {mangaDetails?.title}
            </Typography>
            <Typography variant="caption" component="p" sx={{ fontSize: 14 }}>
              <span className="font-bold">Authors:</span>{" "}
              {mangaDetails?.authors}
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
            color="info"
            fontSize={12}
            genres={mangaDetails?.genres as string[]}
          />
        </Stack>

        {mangaDetails && <MangaDetailTab mangaDetails={mangaDetails} />}
      </Stack>
    </MangaDetailTheme>
  );
}
