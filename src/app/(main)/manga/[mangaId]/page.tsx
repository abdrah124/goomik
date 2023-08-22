import React from "react";
import MangaDetail from "@/components/MangaDetail";
import { getMangaDetail } from "@/lib/getData";
import { config } from "@/lib/config";

interface Props {
  params: { mangaId: string };
}

export async function generateMetadata({ params }: Props) {
  const { data: mangaDetail } = await getMangaDetail(params.mangaId);

  return {
    title: `Gooscans - ${mangaDetail?.title}`,
    description: mangaDetail?.description,
    keywords: [
      "manga",
      "manhwa",
      "manhua",
      "comic",
      "comic book",
      "comic e-book",
      "comics",
      "cartoon",
      "graphic novel",
      "korean comic",
      "japan comic",
      "china comic",
      `${mangaDetail?.title}`,
      "raw manhwa",
      "raw",
      "raw comic",
      "raw manga",
      "raw manhua",
      "read manga",
      `${mangaDetail?.title} detail`,
    ],
    openGraph: {
      title: mangaDetail?.title,
      description: mangaDetail?.description,
      url: `${config.baseWebUrl}/manga/${params.mangaId}`,
      siteName: "gooscans",
      images: [
        {
          url: mangaDetail?.cover_image?.src,
          width: mangaDetail?.cover_image?.width,
          height: mangaDetail?.cover_image?.height,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function Page({ params }: Props) {
  const { mangaId } = params;
  return <MangaDetail mangaId={mangaId} />;
}
