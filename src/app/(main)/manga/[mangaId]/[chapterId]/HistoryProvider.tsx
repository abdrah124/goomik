"use client";
import { useSetReadingHistory } from "@/context/ReadingHistoryContext";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function HistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { addReadingHistory } = useSetReadingHistory();

  useEffect(() => {
    if (pathname.includes("manga") && pathname.includes("chapter")) {
      addReadingHistory({
        chapter: pathname.split("/")[3],
        comicId: pathname.split("/")[3],
        mangaId: pathname.split("/")[2],
      });
    }
  }, [pathname, addReadingHistory]);

  return <>{children}</>;
}
