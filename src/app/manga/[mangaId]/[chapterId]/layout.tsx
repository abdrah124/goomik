import DisqusChapter from "@/components/Disqus";
import React from "react";

export default function Layout({
  children,
  params,
  recommend
}: {
  children: React.ReactNode;
  recommend:React.ReactNode
  params: { mangaId: string; chapterId: string };
}) {
  return (
    <div className="flex flex-col items-center h-auto">
      {children}
      <DisqusChapter mangaId={params.mangaId} chapterId={params.chapterId} />
      {recommend}
    </div>
  );
}
