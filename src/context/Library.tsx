"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

export function MangaLibraryContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [libraryIds, setLibraryIds] = useState<string[]>([]);

  useEffect(() => {
    const items: string[] = JSON.parse(localStorage.getItem("library") || "[]");

    if (items.length > 0) {
      setLibraryIds(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(libraryIds));
  }, [libraryIds]);

  return (
    <LibraryEditContext.Provider value={setLibraryIds}>
      <LibraryContext.Provider value={libraryIds}>
        {children}
      </LibraryContext.Provider>
    </LibraryEditContext.Provider>
  );
}
