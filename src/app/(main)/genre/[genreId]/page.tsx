import MangaCard from "@/components/Card";
import CardGrid from "@/components/CardGrid";
import MangaPagination from "@/components/MangaPagination";
import { getMangaByGenre } from "@/lib/getData";
import { MangaDetailSimplified } from "@/models/manga";
import { Box, Typography } from "@mui/material";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { genreId: string };
}) {
  return {
    title: `Genre - ${params.genreId}`,
    description: `Comic, manhwa, manhua, manga, genre ${params.genreId}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { genreId: string };
  searchParams: { page: string; order_by: string };
}) {
  const { page = "1", order_by } = searchParams;
  const { data: mangaByGenre } = await getMangaByGenre(
    params.genreId,
    Number(page),
    order_by,
    { revalidate: 3600 }
  );

  return (
    <Box
      p={2}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="left"
        sx={{ alignSelf: "start", fontWeight: 700 }}
      >
        {params.genreId[0].toUpperCase() + params.genreId.slice(1)}
      </Typography>
      <Typography
        variant="h5"
        sx={{ alignSelf: "start", fontWeight: 500 }}
        gutterBottom
      >
        {mangaByGenre?.total || "No"} Result{mangaByGenre?.total > 1 ? "s" : ""}
      </Typography>

      <CardGrid>
        {mangaByGenre?.items
          ?.map((item) => ({ ...item, cover_image: item.image }))
          .map((item) => (
            <MangaCard
              key={item.id}
              data={item as unknown as MangaDetailSimplified}
            />
          ))}
      </CardGrid>
      {(mangaByGenre?.total_page ?? 0) > 1 && (
        <MangaPagination
          path={`/genre/${params.genreId}`}
          total={mangaByGenre?.total_page ?? 0}
          query={{ page }}
        />
      )}
    </Box>
  );
}
