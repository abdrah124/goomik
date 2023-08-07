import { getMangaChapter, getMangaChapterList } from "@/lib/getData";
import ChapterImage from "@/components/ChapterImage";
import React from "react";
import PageBreadcrumbs from "./Breadcrumbs";
import { Stack, Typography } from "@mui/material";
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

  return (
    <div className="max-w-md">
      <PageBreadcrumbs
        sx={{ paddingBottom: 2, paddingX: 1 }}
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
      <Typography variant="h4" component="h1" gutterBottom mb={4}>
        {data?.title}
      </Typography>
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
