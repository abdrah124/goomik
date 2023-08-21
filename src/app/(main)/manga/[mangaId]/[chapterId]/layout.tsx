import DisqusChapter from "@/components/Disqus";
import React from "react";
import HistoryProvider from "./HistoryProvider";
import ReadingHistoryProvider from "@/context/ReadingHistoryContext";

export default function Layout({
  children,
  params,
  recommend,
}: {
  children: React.ReactNode;
  recommend: React.ReactNode;
  params: { mangaId: string; chapterId: string };
}) {
  return (
    <div className="flex flex-col items-center h-auto">
      <ReadingHistoryProvider>
        <HistoryProvider>
          {children}
          <DisqusChapter
            mangaId={params.mangaId}
            chapterId={params.chapterId}
          />
          {recommend}
        </HistoryProvider>
      </ReadingHistoryProvider>
    </div>
  );
}
