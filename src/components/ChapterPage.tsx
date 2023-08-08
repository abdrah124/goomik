import { getMangaChapter, getMangaChapterList } from "@/lib/getData";
import ChapterImage from "@/components/ChapterImage";
import React from "react";
import PageBreadcrumbs from "./Breadcrumbs";
import { Stack, Typography } from "@mui/material";
import ChapterNav from "./ChapterNav";
import BackToTopBtn from "./BackToTopBtn";

interface Props {
  mangaId: string;
  chapterId: string;
}

export default async function ChapterPage({ mangaId, chapterId }: Props) {
  const { data } = await getMangaChapter(mangaId, chapterId, { revalidate: 0 });

  const { data: chapterLists } = await getMangaChapterList(mangaId, {
    revalidate: 0,
  });

  return (
    <>
      <div className="max-w-md">
        <Typography variant="h5" component="h1" px={1}>
          {data?.title}
        </Typography>
        <PageBreadcrumbs
          sx={{ paddingBottom: 2, paddingX: 1, marginBottom: 2 }}
          items={[
            { href: "/", title: "Home" },
            { title: data.title.split("-")[0], href: `/manga/${mangaId}` },
            {
              title:
                chapterId[0].toUpperCase() +
                chapterId.slice(1).split("-").join(" "),
              href: `/manga/${mangaId}/${chapterId}`,
            },
          ]}
        />
        <ChapterNav
          sx={{ paddingX: 1 }}
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
          sx={{ paddingX: 1 }}
          chapters={chapterLists?.chapter_list}
          next={`/manga/${mangaId}/${data?.next ?? ""}`}
          prev={data?.prev ? `/manga/${mangaId}/${data.prev}` : undefined}
        />
      </div>
      <BackToTopBtn />
    </>
  );
}
