import MangaPagination from "@/components/MangaPagination";
import SearchCard from "@/components/SearchCard";
import { getSearchResults } from "@/lib/getData";
import { Box, Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Search",
  description: "Search your manhwa, manga, manhua",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; page: string; order_by: string };
}) {
  const { q, page = "1", order_by = "relevance" } = searchParams;

  const { data } = await getSearchResults(q, Number(page), order_by, {
    revalidate: 0,
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          padding: 3,
          width: "100%",
          maxWidth: 768,
          marginX: "auto",
        }}
      >
        {data?.items?.length > 0 ? (
          data?.items?.map((e) => <SearchCard data={e} key={e.id} />)
        ) : (
          <Typography variant="subtitle1" component="p">
            NO RESULT
          </Typography>
        )}
      </Box>
      {(data?.total_page ?? 0) > 1 && data?.items?.length > 0 && (
        <MangaPagination
          path="/search"
          query={{
            page,
            q,
            order_by,
          }}
          total={data?.total_page ?? 0}
          sx={{ mx: 1, display: "flex", justifyContent: "center" }}
        />
      )}
    </>
  );
}
