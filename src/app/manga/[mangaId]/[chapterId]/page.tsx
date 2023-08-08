import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "@/components/PageLoader";

const ChapterPage = dynamic(() => import("@/components/ChapterPage"), {
  ssr: false,
  loading: ({}) => <PageLoader />,
});

export default function Page({
  params,
}: {
  params: { mangaId: string; chapterId: string };
}) {
  return (
    <main className="flex flex-col items-center h-auto">
      <ChapterPage {...params} />
    </main>
  );
}
