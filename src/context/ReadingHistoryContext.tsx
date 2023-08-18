"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ReadingHistory {
  comicId: string;
  chapter: string;
  mangaId: string;
}

const ReadingHistoryContext = createContext<ReadingHistory[]>([]);
const ReadingHistorySetterContext = createContext<
  React.Dispatch<React.SetStateAction<ReadingHistory[]>>
>(() => {});

export function useGetReadingHistory(): ReadingHistory[] {
  const readingHistory = useContext(ReadingHistoryContext);

  return readingHistory;
}

export function useSetReadingHistory(): {
  addReadingHistory: (data: ReadingHistory) => void;
  clearReadingHistory: () => void;
  deleteReadingHistory: (id: string) => void;
} {
  const setReadingHistory = useContext(ReadingHistorySetterContext);

  const addReadingHistory = useCallback(
    (data: ReadingHistory) => {
      setReadingHistory((c) => [data, ...c]);
    },
    [setReadingHistory]
  );

  const clearReadingHistory = useCallback(() => {
    setReadingHistory([]);
  }, [setReadingHistory]);

  const deleteReadingHistory = useCallback(
    (id: string) => {
      setReadingHistory((current) => {
        return current.filter((item) => item.comicId !== id);
      });
    },
    [setReadingHistory]
  );

  return { addReadingHistory, clearReadingHistory, deleteReadingHistory };
}

export default function ReadingHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [readingHistory, setReadingHistory] = useState<ReadingHistory[]>([]);

  useEffect(() => {
    const items: ReadingHistory[] = JSON.parse(
      localStorage.getItem("reading_history") ?? "[]"
    );

    if (items) setReadingHistory(items);
  }, []);

  useEffect(() => {
    if (readingHistory)
      localStorage.setItem("reading_history", JSON.stringify(readingHistory));
  }, [readingHistory]);

  return (
    <ReadingHistoryContext.Provider value={readingHistory}>
      <ReadingHistorySetterContext.Provider value={setReadingHistory}>
        {children}
      </ReadingHistorySetterContext.Provider>
    </ReadingHistoryContext.Provider>
  );
}
