import React, { Suspense } from "react";
import MangaDetail from "@/components/MangaDetail";

export default function Page({ params }: { params: { mangaId: string } }) {
  const { mangaId } = params;
  return (
    <main className="w-full">
      <MangaDetail mangaId={mangaId} />
    </main>
  );
}
