import { getMangaDetail } from "@/lib/getData";
import {
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Rating,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import MangaDescription from "./MangaDescription";
import Link from "next/link";
import NewBadge from "./NewBadge";
import SearchCardTheme from "./theme/typographySearchCard";
import GenreBadges from "./GenreBadges";
import MangaDetailTab from "./MangaDetailTab";

export default async function MangaDetail({ mangaId }: { mangaId: string }) {
  const { data: mangaDetails } = await getMangaDetail(mangaId, {
    revalidate: 0,
  });

  const { src, width, height } = mangaDetails?.cover_image;
  return (
    <SearchCardTheme>
      <Stack
        direction="column"
        alignItems="start"
        justifyContent="start"
        marginX="auto"
        width="100%"
        paddingY={1}
        maxWidth={768}
      >
        <Stack direction="row" gap={2}>
          <div className="pl-3">
            <Image
              src={src}
              width={width}
              height={height}
              alt={mangaDetails.title}
              className="rounded-md shadow-md min-w-[110px] shadow-[rgba(0,0,0,.3)]"
              unoptimized
            />
          </div>
          <Stack direction="column" gap={1} width="70%">
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontSize: { xs: "1.30rem", md: "1.5rem" } }}
              gutterBottom
            >
              {mangaDetails.title}
            </Typography>
            <p className="text-zinc-500 txt-cab font-bold text-sm">
              <span className="text-black">Authors:</span>{" "}
              {mangaDetails.authors}
            </p>
            <p className="text-zinc-500 txt-cab font-bold text-sm">
              <span className="text-black">Artists:</span>{" "}
              {mangaDetails.artists}
            </p>
            <p className="text-zinc-500 txt-cab font-bold text-sm">
              <span className="text-black">Status:</span> {mangaDetails.status}
            </p>

            <Stack direction="row" alignItems="center" gap={1}>
              <Rating value={mangaDetails.rating} readOnly precision={0.5} />
              <p className="text-black txt-cab font-bold text-sm">
                {mangaDetails.rating} / 5
              </p>
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
            genres={mangaDetails.genres as string[]}
          />
        </Stack>

        <MangaDetailTab mangaDetails={mangaDetails} />
      </Stack>
    </SearchCardTheme>
  );
}
