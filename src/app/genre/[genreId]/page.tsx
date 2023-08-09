import MangaCard from "@/components/Card";
import CardGrid from "@/components/CardGrid";
import MangaPagination from "@/components/MangaPagination";
import NavTabs from "@/components/NavTabs";
import { getMangaByGenre } from "@/lib/getData";
import { MangaDetailSimplified } from "@/models/manga";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { genreId: string };
  searchParams: { page: string; order_by: string };
}) {
  const { page, order_by } = searchParams;
  const { data: mangaByGenre } = await getMangaByGenre(
    params.genreId,
    Number(page),
    order_by,
    { revalidate: 0 }
  );
  console.log(mangaByGenre, " mangabyge");
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
          query={{ page, order_by }}
        />
      )}
    </Box>
  );
}
