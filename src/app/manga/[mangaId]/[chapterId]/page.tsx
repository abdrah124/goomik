import ChapterPage from "@/components/ChapterPage";
import React, { Suspense } from "react";

export default function Page({
  params,
}: {
  params: { mangaId: string; chapterId: string };
}) {
  return (
    <main className="flex flex-col items-center h-auto">
      <Suspense fallback="loading...">
        <ChapterPage {...params} />
      </Suspense>
    </main>
  );
}
