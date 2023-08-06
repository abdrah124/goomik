import { getMangaChapter, getMangaChapterList } from "@/lib/getData";
import ChapterImage from "@/components/ChapterImage";
import React from "react";
import PageBreadcrumbs from "./Breadcrumbs";
import { Stack } from "@mui/material";
import ChapterNav from "./ChapterNav";

interface Props {
  mangaId: string;
  chapterId: string;
}

export default async function ChapterPage({ mangaId, chapterId }: Props) {
  const { data } = await getMangaChapter(mangaId, chapterId, { revalidate: 0 });

  const { data: chapterLists } = await getMangaChapterList(mangaId, {
    revalidate: 0,
  });
  console.log(data);
  return (
    <div>
      <PageBreadcrumbs
        sx={{ paddingBottom: 2, paddingX: 1 }}
        items={[
          { href: "/", title: "Home" },
          { title: mangaId.split("-").join(" "), href: `/manga/${mangaId}` },
          {
            title:
              chapterId[0].toUpperCase() +
              chapterId.slice(1).split("-").join(" "),
            href: `/manga/${mangaId}/${chapterId}`,
          },
        ]}
      />
      <ChapterNav
        chapters={chapterLists?.chapter_list}
        next={`/manga/${mangaId}/${data?.next ?? ""}`}
        prev={data?.prev ? `/manga/${mangaId}/${data.prev}` : undefined}
      />

      <Stack direction="column" marginY={1}>
        {data?.images?.map((e, i) => (
          <ChapterImage image={e} index={i} key={e} />
        ))}
      </Stack>

      <ChapterNav
        chapters={chapterLists?.chapter_list}
        next={`/manga/${mangaId}/${data?.next ?? ""}`}
        prev={data?.prev ? `/manga/${mangaId}/${data.prev}` : undefined}
      />
    </div>
  );
}
