"use client";
import LibraryDeleteBtn from "@/components/LibraryDeleteBtn";
import SearchCard from "@/components/SearchCard";
import SearchCardSkeleton from "@/components/SearchCardSkeleton";
import { useGetLibraryItems } from "@/context/Library";
import { config } from "@/lib/config";
import { Stack } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";

function LibraryCard({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
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

  if (isLoading) return <SearchCardSkeleton />;
  if (isError) return null;
  return (
    <div className="relative">
      <SearchCard data={data} />
      <span className="absolute right-0 bottom-4">
        <LibraryDeleteBtn variant="trash" id={id} />
      </span>
    </div>
  );
}

export default function Page() {
  const libraryItems = useGetLibraryItems();

  return (
    <div className="w-full">
      <Stack direction="column" gap={2}>
        {libraryItems.length > 0 &&
          libraryItems.map((item) => <LibraryCard key={item} id={item} />)}
      </Stack>
    </div>
  );
}
