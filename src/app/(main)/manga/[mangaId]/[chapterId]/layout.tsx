import DisqusChapter from "@/components/Disqus";
import React from "react";
import HistoryProvider from "./HistoryProvider";

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
      <HistoryProvider>
        {children}
        <DisqusChapter mangaId={params.mangaId} chapterId={params.chapterId} />
        {recommend}
      </HistoryProvider>
    </div>
  );
}
