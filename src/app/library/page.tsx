"use client";
import MangaCard from "@/components/Card";
import CardGrid from "@/components/CardGrid";
import CardSkeleton from "@/components/CardSkeleton";
import LibraryDeleteBtn from "@/components/LibraryDeleteBtn";
import NewBadge from "@/components/NewBadge";
import SearchCard from "@/components/SearchCard";
import SearchCardSkeleton from "@/components/SearchCardSkeleton";
import { useGetLibraryItems } from "@/context/Library";
import { config } from "@/lib/config";
import { sortArray } from "@/lib/sortArray";
import { MangaDetailFull } from "@/models/manga";
import { Grid3x3, GridView, List } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";

const useGetLibraryItem = (id:string)  => {
  const query = useQuery<MangaDetailFull>({
    queryKey: ["Library Items", id],
    queryFn: () =>
      fetch(`${config.baseWebUrl}/api/manga/${id}`)
        .then((res) => res.json())
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: id !== "",
    staleTime: 3600,
  });
  return query
}

function LibraryCard({ id }: { id: string }) {
  const { data, isLoading, isError, isSuccess } = useGetLibraryItem(id)

  if (isLoading) return <SearchCardSkeleton />;
  if (isError) return null;

  const isContainNew = data?.chapter_list?.some?.(chapter => chapter?.release_date === "new")

  if(isSuccess)
  return (
    <div className="relative">
      <SearchCard data={data} />
      {isContainNew && <span className=" absolute top-4 left-4"><NewBadge /></span>}
      <span className="absolute right-0 bottom-4">
        <LibraryDeleteBtn variant="trash" id={id} />
      </span>
    </div>
  );
}

function MangaLibraryCard ({id}:{id:string}) {
  const { data, isLoading, isError, isSuccess } = useGetLibraryItem(id)

  if (isLoading) return <CardSkeleton />;
  if (isError) return null;

  const isContainNew = data?.chapter_list?.some?.(chapter => chapter?.release_date === "new")

  if(isSuccess)
  return <div className="relative">
  <MangaCard data={data} />
  {isContainNew && <span className=" absolute top-2 right-2"><NewBadge /></span>}
  <span className="absolute -right-2 bottom-0">
    <LibraryDeleteBtn variant="trash" id={id} />
  </span>
</div>
}

export default function Page() {
  const [list, setList] = useState(true)
  const libraryItems = useGetLibraryItems();

  return (
    <div className="w-full">
      <Paper elevation={5} sx={{width:"100%", display:"flex", justifyContent:"end", px:2, mb:3, py:1,}}>
        <IconButton onClick={() => setList(!list)}>{list ? <GridView /> : <List />}</IconButton>
      </Paper>
      {
list ? <Stack direction="column" gap={2}>
        {libraryItems.length > 0 &&
          sortArray(libraryItems).map((item) => <LibraryCard key={item} id={item} />)}
      </Stack> : <CardGrid>
        {libraryItems.length > 0 && sortArray(libraryItems).map(item => <MangaLibraryCard key={item}id={item} />)}
      </CardGrid>
      }
     {libraryItems.length === 0 && <Typography variant="h4" component="h2">No item in library</Typography>}
    </div>
  );
}
