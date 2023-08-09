import DisqusChapter from "@/components/DisqusChapter";
import React from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { mangaId: string; chapterId: string };
}) {
  return (
    <main className="flex flex-col items-center h-auto">
      {children}
      <DisqusChapter mangaId={params.mangaId} chapterId={params.chapterId} />
    </main>
  );
}
