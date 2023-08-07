import MangaPagination from "@/components/MangaPagination";
import NavTabs from "@/components/NavTabs";
import SearchCard from "@/components/SearchCard";
import { getSearchResults } from "@/lib/getData";
import { Box } from "@mui/material";
import React from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; page: string; order_by: string };
}) {
  const { q, page = "1", order_by = "relevance" } = searchParams;

  const { data } = await getSearchResults(q, Number(page), order_by);

  return (
    <main className="w-full">
      <NavTabs />
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
        {data.items.map((e) => (
          <SearchCard data={e} key={e.id} />
        ))}
      </Box>
      <MangaPagination
        path="/search"
        query={{
          page,
          q,
          order_by,
        }}
        total={data.total}
        sx={{ mx: 1, display: "flex", justifyContent: "center" }}
      />
    </main>
  );
}
