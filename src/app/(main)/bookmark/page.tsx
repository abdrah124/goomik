"use client";
import MangaCard from "@/components/Card";
import CardGrid from "@/components/CardGrid";
import CardSkeleton from "@/components/CardSkeleton";
import LibraryDeleteBtn from "@/components/LibraryDeleteBtn";
import NewBadge from "@/components/NewBadge";
import SearchCard from "@/components/SearchCard";
import SearchCardSkeleton from "@/components/SearchCardSkeleton";
import { useGetLibraryItems } from "@/context/Library";
import { sortArray } from "@/lib/sortArray";
import { GridView, List } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SyncItemButton from "@/components/SyncItemButton";
import BookmarkGridLayout from "@/components/layout/BookmarkGridLayout";
import { useGetMangaDetail } from "@/hooks/reactquery/query";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "70%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function LibraryCard({ id }: { id: string }) {
  const { data, isLoading, isError, isSuccess } = useGetMangaDetail(id);

  if (isLoading) return <SearchCardSkeleton />;
  if (isError) return null;

  const isContainNew = data?.chapter_list?.some?.(
    (chapter) => chapter?.release_date === "new"
  );

  if (isSuccess)
    return (
      <div className="relative w-full max-w-sm">
        <SearchCard data={data} />
        {isContainNew && (
          <span className=" absolute top-4 left-4">
            <NewBadge />
          </span>
        )}
        <span className="absolute right-0 bottom-4">
          <LibraryDeleteBtn variant="trash" id={id} />
        </span>
      </div>
    );
}

function MangaLibraryCard({ id }: { id: string }) {
  const { data, isLoading, isError, isSuccess } = useGetMangaDetail(id);

  if (isLoading) return <CardSkeleton />;
  if (isError) return null;

  const isContainNew = data?.chapter_list?.some?.(
    (chapter) => chapter?.release_date === "new"
  );

  if (isSuccess)
    return (
      <div className="relative w-full max-w-sm">
        <MangaCard data={data} />
        {isContainNew && (
          <span className=" absolute top-2 right-2">
            <NewBadge />
          </span>
        )}
        <span className="absolute -right-4 bottom-[74px]">
          <LibraryDeleteBtn variant="trash" id={id} />
        </span>
      </div>
    );
}

export default function Page() {
  const [list, setList] = useState(true);

  let libraryItems = useGetLibraryItems();

  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  const items = sortArray(libraryItems).filter((item) =>
    item.toLowerCase().includes(input.toLowerCase().trim())
  );

  return (
    <div className="w-full">
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: "inherit",
          justifyContent: "space-between",
          maxWidth: 500,
          px: 2,
          mb: 3,
          py: 1,
        }}
      >
        <Search onSubmit={handleSubmit} style={{ position: "relative" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <IconButton onClick={() => setList(!list)}>
          {list ? <GridView /> : <List />}
        </IconButton>
      </Paper>
      <Divider sx={{ my: 2 }} />
      {list ? (
        <BookmarkGridLayout>
          {libraryItems.length > 0 &&
            items.map((item) => <LibraryCard key={item} id={item} />)}
        </BookmarkGridLayout>
      ) : (
        <CardGrid>
          {libraryItems.length > 0 &&
            items.map((item) => <MangaLibraryCard key={item} id={item} />)}
        </CardGrid>
      )}
      {libraryItems.length === 0 && (
        <Typography variant="h4" component="h2">
          No item in library
        </Typography>
      )}
      <Divider sx={{ my: 2 }} />
      <SyncItemButton />
    </div>
  );
}
