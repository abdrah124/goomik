import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import NewBadge from "./NewBadge";
import { MangaDetailFull } from "@/models/manga";

export default function MangaChapterList({
  mangaDetails,
}: {
  mangaDetails: MangaDetailFull;
}) {
  return (
    <Stack direction="column" width="100%">
      <List sx={{ paddingTop: 0 }}>
        {mangaDetails.chapter_list.map((chapter) => (
          <ListItem
            disablePadding
            key={chapter.id}
            sx={{ borderBottom: "solid 1px rgb(228, 228, 231)" }}
          >
            <Link
              href={`/manga/${mangaDetails.id}/${chapter.id}`}
              className="hover:brightness-75 transition-all flex w-full justify-between py-3 px-4 visited:text-zinc-500"
            >
              <ListItemText
                sx={{
                  padding: 0,
                  margin: 0,
                  maxWidth: "60%",
                }}
                primaryTypographyProps={{
                  variant: "subtitle2",
                }}
                primary={
                  chapter.id[0].toUpperCase() +
                  chapter.id.slice(1).split("-").join(" ")
                }
              />
              {chapter.release_date !== "new" ? (
                <Typography variant="subtitle2">
                  {chapter.release_date as string}
                </Typography>
              ) : (
                <NewBadge />
              )}
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
