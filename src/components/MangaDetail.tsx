import { getMangaDetail } from "@/lib/getData";
import {
  Paper,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import MangaDescription from "./MangaDescription";
import Link from "next/link";
import NewBadge from "./NewBadge";
import MangaDetailTable from "./MangaDetailTable";

export default async function MangaDetail({ mangaId }: { mangaId: string }) {
  const { data: mangaDetails } = await getMangaDetail(mangaId, {
    revalidate: 0,
  });

  const { src, srcset, width, height } = mangaDetails.cover_image;
  return (
    <Stack direction="column" alignItems="center" width="100%" p={1}>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        {mangaDetails.title}
      </Typography>
      <Image
        src={src}
        width={width}
        height={height}
        alt={mangaDetails.title}
        className="rounded-sm shadow-md shadow-[rgba(0,0,0,.5)]"
        unoptimized
      />
      <Stack direction="column" width="90%" mt={4}>
        <MangaDetailTable mangaDetails={mangaDetails} />
      </Stack>
      <Stack
        component={Paper}
        elevation={3}
        padding={1}
        direction="column"
        width="90%"
        mt={4}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          {mangaDetails.title}
        </Typography>
        <MangaDescription desc={mangaDetails.description ?? ""} />
      </Stack>
      <Stack
        component={Paper}
        elevation={3}
        padding={1}
        direction="column"
        width="90%"
        mt={4}
      >
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
  );
}
