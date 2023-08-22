"use client";
import { useGetUserBookmarks } from "@/hooks/reactquery/query";
import useGetMe from "@/hooks/useGetMe";
import { config } from "@/lib/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";

const LibraryEditContext = createContext<Dispatch<SetStateAction<string[]>>>(
  () => {}
);
const LibraryContext = createContext<string[]>([]);

export function useDeleteLibraryItem() {
  const setLibrary = useContext(LibraryEditContext);

  const deleteItem = (id: string) => {
    setLibrary((current) => current.filter((item) => item !== id));
  };
  return deleteItem;
}

export function useGetLibraryItems() {
  const libraryItems = useContext(LibraryContext);

  return libraryItems;
}

export function useEditLibraryItem() {
  const setLibrary = useContext(LibraryEditContext);

  const editItem = (id: string, newItemId: string) => {
    setLibrary((current) =>
      current.map((item) => {
        if (item === id) return newItemId;
        return item;
      })
    );
  };
  return editItem;
}

export function useAddLibraryItem() {
  const setLibrary = useContext(LibraryEditContext);

  const addItem = (id: string) => {
    setLibrary((current) => [...current, id]);
  };

  return addItem;
}

export function MangaLibraryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const me = useGetMe();
  const [libraryIds, setLibraryIds] = useState<string[]>([]);

  const { data: savedLibIds } = useGetUserBookmarks(me?.id);

  useEffect(() => {
    const items: string[] = JSON.parse(localStorage.getItem("library") || "[]");

    if (items.length > 0 && session?.status !== "authenticated") {
      setLibraryIds(items);
    }
  }, [session]);

  useEffect(() => {
    if (session?.status === "authenticated" && savedLibIds) {
      const items = savedLibIds?.bookmarks?.map((bookmark) => bookmark.comicId);
      setLibraryIds(items);
    }
  }, [session, savedLibIds]);

  useEffect(() => {
    if (session?.status !== "authenticated") {
      localStorage.setItem("library", JSON.stringify(libraryIds));
      localStorage.setItem("libraryBackup", JSON.stringify(libraryIds));
    }
  }, [libraryIds, session]);

  return (
    <LibraryEditContext.Provider value={setLibraryIds}>
      <LibraryContext.Provider value={libraryIds}>
        {children}
      </LibraryContext.Provider>
    </LibraryEditContext.Provider>
  );
}
