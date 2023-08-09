"use client";
import { useQuery } from "react-query";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { config } from "@/lib/config";
import {
  MangaDetailSimplified,
  PagingObject,
  ResponseObject,
} from "@/models/manga";
const { baseWebUrl } = config;

export default function SearchSelect({
  input,
  onListClick,
}: {
  input: string;
  onListClick: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    data: searchResult,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<ResponseObject<PagingObject<MangaDetailSimplified[]>>>({
    queryKey: ["Search Results", input],
    queryFn: () =>
      fetch(`${baseWebUrl}/api/search?q=${input.trim()}`, {
        next: { revalidate: 3600 },
      })
        .then((res) => res.json())
        .catch((err) => Promise.reject(err)),
    retry: 0,
    enabled: input.length > 0,
  });

  if (!input) return "";

  return (
    <Box
      component={Paper}
      elevation={3}
      className="w-full absolute top-[100%] mt-2 rounded-sm bg-zinc-200 text-zinc-800"
    >
      {isLoading ? (
        <div className="py-4 flex justify-center items-center w-full">
          <CircularProgress />
        </div>
      ) : (
        !isError &&
        isSuccess && (
          <List disablePadding>
            {searchResult?.data?.items?.slice(0, 5)?.map((result) => (
              <ListItem disablePadding key={result.id}>
                {searchResult?.data?.items?.length > 0 ? (
                  <ListItemButton
                    LinkComponent={Link}
                    onClick={() => onListClick("")}
                    href={`/manga/${result.id}`}
                  >
                    <ListItemText primary={result.title} />
                  </ListItemButton>
                ) : (
                  <ListItemText primary="No result" />
                )}
              </ListItem>
            ))}
          </List>
        )
      )}
    </Box>
  );
}
