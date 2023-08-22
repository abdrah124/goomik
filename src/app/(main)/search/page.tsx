import MangaPagination from "@/components/MangaPagination";
import SearchCard from "@/components/SearchCard";
import { getSearchResults } from "@/lib/getData";
import { Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gooscans - Search",
  description: "Search your manhwa, manga, manhua",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; page: string; order_by: string };
}) {
  const { q, page = "1", order_by = "relevance" } = searchParams;

  const { data } = await getSearchResults(q, Number(page), order_by, {
    revalidate: 3600,
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-4 gap-4 justify-items-center px-4">
        {data?.items?.length > 0 ? (
          data?.items?.map((e) => <SearchCard data={e} key={e.id} />)
        ) : (
          <Typography variant="subtitle1" component="p">
            NO RESULT
          </Typography>
        )}
      </div>
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
