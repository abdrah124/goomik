import MangaDetail from "@/components/MangaDetail";
import MangaDetailSkeleton from "@/components/MangaDetailSkeleton";
import React, { Suspense } from "react";

export default function Page({ params }: { params: { mangaId: string } }) {
  const { mangaId } = params;
  return (
    <main className="w-full">
      <MangaDetail mangaId={mangaId} />
    </main>
  );
}
