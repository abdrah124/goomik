// PR
// caching fetch chapterlist
//styling chapternav link

import { Button, ButtonGroup, Stack } from "@mui/material";
import React from "react";
import SelectMenu from "./SelectMenu";
import { ChevronLeft, ChevronRight, Info } from "@mui/icons-material";
import { MangaChapterFull } from "@/models/manga";
import Link from "next/link";

export default function ChapterNav({
  chapters,
  next,
  prev,
}: {
  chapters: MangaChapterFull[];
  next: string | undefined;
  prev: string | undefined;
}) {
  console.log(next?.split("/"));

  return (
    <Stack direction="row" gap={1}>
      <SelectMenu items={chapters} />
      <ButtonGroup variant="contained" sx={{ width: "fit-content" }}>
        {prev && (
          <Button
            component={Link}
            href={prev}
            disabled={!next}
            color="primary"
            variant="contained"
            sx={{
              color: "text.primary",
              "&:visited": "text.primary",
            }}
          >
            <ChevronLeft />
          </Button>
        )}

        <Button
          color="primary"
          variant="contained"
          component={Link}
          href={next}
          sx={{
            color: "text.primary",
            "&:visited": "text.primary",
          }}
        >
          {(next?.split("/") ?? "")?.[3] !== "" ? <ChevronRight /> : <Info />}
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
