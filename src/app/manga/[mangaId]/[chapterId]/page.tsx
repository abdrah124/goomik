import ChapterPage from "@/components/ChapterPage";
import PageLoader from "@/components/PageLoader";
import React, { Suspense } from "react";

export default function Page({
  params,
}: {
  params: { mangaId: string; chapterId: string };
}) {
  return (
    <main className="flex flex-col items-center h-auto">
      <Suspense fallback={<PageLoader />}>
        <ChapterPage {...params} />
      </Suspense>
    </main>
  );
}
