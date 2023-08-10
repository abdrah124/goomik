"use client";
import { useGetLibraryItems } from "@/context/Library";
import React from "react";
import LibraryDeleteBtn from "./LibraryDeleteBtn";
import LibraryAddBtn from "./LibraryAddBtn";

export default function BookmarkBtn({ id }: { id: string }) {
  const libraryItems = useGetLibraryItems();

  const isBookmarked = libraryItems?.find((item) => item === id);

  if (isBookmarked) return <LibraryDeleteBtn id={id} />;
  return <LibraryAddBtn id={id} />;
}
