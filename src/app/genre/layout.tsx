import BackToTopBtn from "@/components/BackToTopBtn";
import GenreBadges from "@/components/GenreBadges";
import { getGenreList } from "@/lib/getData";
import {
  Divider,
  Stack,
  Typography,
  Link as MuiLink,
  Button,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import React from "react";

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
        gap={3}
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        px={1}
        pb={2}
      >
        {Array.from(genreAlphabet).map((alp) => (
          <IconButton
            component={Link}
            href={`#${alp}`}
            key={alp}
            sx={{ fontSize: 16, padding: ".5em", px: "1em" }}
          >
            {alp.toUpperCase()}
          </IconButton>
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
          <Typography variant="h5" component="h2">
            {alp.toUpperCase()}
          </Typography>
          <Divider />
          <Stack direction="row" flexWrap="wrap" key={alp} gap={2}>
            <GenreBadges
              color="warning"
              genres={Array.from(genreMap)
                .filter((genre) => genre.startsWith(alp))
                .map((genre) => genre[0].toUpperCase() + genre.slice(1))}
              fontSize={15}
            />
          </Stack>
        </Stack>
      ))}
      <BackToTopBtn />
    </main>
  );
}
