import SearchCard from "@/components/SearchCard";
import { getSearchResults } from "@/lib/getData";
import { Box, Paper } from "@mui/material";
import React from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q } = searchParams;

  const { data } = await getSearchResults(q);

  return (
    <main>
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {data.items.map((e) => (
          <SearchCard data={e} key={e.id} />
        ))}
      </Box>
    </main>
  );
}
