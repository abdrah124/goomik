import { getMangaDetail } from "@/lib/getData";
import {
  Paper,
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
import MangaDetailTable from "./MangaDetailTable";
import SearchCardTheme from "./theme/typographySearchCard";
import GenreBadges from "./GenreBadges";

export default async function MangaDetail({ mangaId }: { mangaId: string }) {
  const { data: mangaDetails } = await getMangaDetail(mangaId, {
    revalidate: 0,
  });

  const { src, width, height } = mangaDetails.cover_image;
  return (
    <SearchCardTheme>
      <Stack
        direction="column"
        alignItems="start"
        justifyContent="start"
        marginX="auto"
        width="100%"
        p={1}
        maxWidth={768}
      >
        <Stack direction="row" gap={2}>
          <div className="w-[30%] pl-2">
            <Image
              src={src}
              width={width}
              height={height}
              alt={mangaDetails.title}
              className="rounded-md shadow-md min-w-36 shadow-[rgba(0,0,0,.5)]"
              unoptimized
            />
          </div>
          <Stack direction="column" gap={1} width="70%">
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 700,
                fontFamily: "var(--cabin)",
                fontSize: { xs: 18, md: "auto" },
              }}
            >
              {mangaDetails.title}
            </Typography>
            <p className="text-zinc-500 qc-b text-sm">{mangaDetails.authors}</p>
            <Stack direction="row" alignItems="center" gap={1}>
              <Rating value={mangaDetails.rating} readOnly precision={0.5} />
              <p className="text-zinc-500 qc-b text-sm">
                {mangaDetails.rating} / 5
              </p>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          gap={1}
          width="100%"
          mt={4}
          paddingX={1}
          className="hide-scrollbar"
          sx={{ overflowX: "auto" }}
        >
          <GenreBadges fontSize={12} genres={mangaDetails.genres as string[]} />
        </Stack>
        <Stack direction="column" mt={2} padding={1}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Summary
          </Typography>
          <MangaDescription desc={mangaDetails.description ?? ""} />
        </Stack>
        <Stack padding={1} direction="column" mt={2} width="100%">
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Latest Chapter
          </Typography>
          <List>
            {mangaDetails.chapter_list.map((e) => (
              <ListItem disablePadding key={e.id}>
                <Link
                  href={`/manga/${mangaDetails.id}/${e.id}`}
                  className="hover:brightness-75 transition-all flex w-full justify-between items-center"
                >
                  <ListItemText
                    sx={{ padding: 1 }}
                    primaryTypographyProps={{
                      variant: "caption",
                      fontSize: 13,
                    }}
                    primary={
                      e.id[0].toUpperCase() + e.id.slice(1).split("-").join(" ")
                    }
                  />
                  {e.release_date !== "new" ? (
                    <Typography variant="caption" fontSize={13}>
                      {e.release_date as string}
                    </Typography>
                  ) : (
                    <NewBadge />
                  )}{" "}
                </Link>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
    </SearchCardTheme>
  );
}
