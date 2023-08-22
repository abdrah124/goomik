"use client";
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
import { useGetSearchResult } from "@/hooks/reactquery/query";

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
  } = useGetSearchResult(input);

  if (!input) return "";

  return (
    <Box
      component={Paper}
      elevation={3}
      className="w-full absolute top-[100%] mt-2 rounded-sm bg-zinc-200 text-zinc-800"
    >
      {isLoading ? (
        <div className="py-4 flex justify-center items-center w-full">
          <CircularProgress color="secondary" />
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
