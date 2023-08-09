import { Button, ButtonGroup, Stack, SxProps, Theme } from "@mui/material";
import React from "react";
import SelectMenu from "./SelectMenu";
import { ChevronLeft, ChevronRight, Info } from "@mui/icons-material";
import { MangaChapterFull } from "@/models/manga";
import Link from "next/link";

export default function ChapterNav({
  chapters,
  next,
  prev,
  sx,
}: {
  chapters: MangaChapterFull[];
  next: string | undefined;
  prev: string | undefined;
  sx?: SxProps<Theme> | undefined;
}) {
  return (
    <Stack direction="row" gap={1} sx={{ ...sx }}>
      <SelectMenu items={chapters} />
      <ButtonGroup variant="contained" sx={{ width: "fit-content" }}>
        {prev && (
          <Button
            component={Link}
            scroll={true}
            href={prev + '#'}
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
          scroll={true}
          component={Link}
          href={next + '#'}
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
