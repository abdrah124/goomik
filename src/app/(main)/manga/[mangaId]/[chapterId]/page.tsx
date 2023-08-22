import React from "react";
import { getMangaChapter, getMangaDetail } from "@/lib/getData";
import { config } from "@/lib/config";
import ChapterPage from "@/components/ChapterPage";
import HistoryProvider from "./HistoryProvider";

interface Props {
  params: { mangaId: string; chapterId: string };
}

export async function generateMetadata({ params }: Props) {
  const { data: mangaChapter } = await getMangaChapter(
    params.mangaId,
    params.chapterId
  );
  const { data: mangaDetails } = await getMangaDetail(params.mangaId);

  return {
    title: `Gooscans - ${mangaChapter?.title}`,
    description: mangaDetails?.description,
    keywords: [
      `${mangaChapter?.title}`,
      ...(mangaDetails?.genres ?? []),
      mangaDetails?.alternative_title,
    ],
    openGraph: {
      title: mangaChapter?.title,
      description: mangaDetails?.description,
      url: `${config.baseWebUrl}/manga/${params.mangaId}/${params.chapterId}`,
      siteName: "gooscans",
      images: [
        {
          url: mangaDetails?.cover_image?.src,
          width: mangaDetails?.cover_image?.width,
          height: mangaDetails?.cover_image?.height,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function Page({ params }: Props) {
  return (
    <HistoryProvider>
      <ChapterPage {...params} />
    </HistoryProvider>
  );
}
