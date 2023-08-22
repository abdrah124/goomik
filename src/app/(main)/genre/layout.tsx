import BackToTopBtn from "@/components/BackToTopBtn";
import GenreBadges from "@/components/GenreBadges";
import { getGenreList } from "@/lib/getData";
import { Divider, Stack, Typography, Paper } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metaData: Metadata = {
  title: "Gooscans - Genre",
  description:
    "Search your favorite comic , manga, manhwa, manhua by genre here",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: genres } = await getGenreList();

  const genreMap = new Set(genres.genres);
  const genreAlphabet = new Set(genres.genres.map((genre) => genre[0]));

  return (
    <main>
      {children}
      <Stack
        gap={1}
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        px={1}
        pb={2}
      >
        {Array.from(genreAlphabet).map((alp) => (
          <Paper
            elevation={3}
            component={Link}
            href={`#${alp}`}
            key={alp}
            sx={{
              fontSize: { xs: 13 },
              padding: ".5em",
              px: "1em",
              width: 35,
              textAlign: "center",
              height: 35,
              "&:hover": {
                filter: "brightness(75%)",
              },
            }}
          >
            {alp.toUpperCase()}
          </Paper>
        ))}
      </Stack>

      {Array.from(genreAlphabet).map((alp) => (
        <Stack
          direction="column"
          component="section"
          key={alp}
          gap={2}
          px={3}
          pb={3}
          id={alp}
        >
          <Typography variant="h6" component="h2">
            {alp.toUpperCase()}
          </Typography>
          <Divider />
          <Stack direction="row" flexWrap="wrap" key={alp} gap={1.2}>
            <GenreBadges
              color="info"
              size="small"
              genres={Array.from(genreMap)
                .filter((genre) => genre.startsWith(alp))
                .map((genre) => genre[0].toUpperCase() + genre.slice(1))}
              fontSize={13}
            />
          </Stack>
        </Stack>
      ))}
      <BackToTopBtn />
    </main>
  );
}
