import { config } from "@/lib/config";
import { fetchHTML } from "@/lib/fetcher";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { getPathname } from "@/lib/getPathname";
import {
  MangaChapterFull,
  ResponseObject,
  ResponseObjectFailed,
} from "@/models/manga";
const { baseScraptUrl, baseWebUrl } = config;

export async function GET(
  request: Request,
  { params }: { params: { mangaId: string } }
): Promise<
  | NextResponse<
      ResponseObject<{ chapter_list: MangaChapterFull[]; total: number }>
    >
  | NextResponse<ResponseObjectFailed>
> {
  const { mangaId } = params;
  try {
    const html = await fetchHTML(`${baseScraptUrl}/manga/${mangaId}`);

    const $ = cheerio.load(html);

    const chapter_list: MangaChapterFull[] = [];

    const chapterItems = $(
      "div.page-content-listing.single-page > div.listing-chapters_wrap > ul.main.version-chap > li.wp-manga-chapter"
    ).each((i, el) => {
      const chapter = (
        getPathname($(el).find("a").attr("href") as string) as string[]
      )[3];

      chapter_list.push({
        chapter: Number(chapter.split("-")[1]),
        id: chapter,
        url: `${baseWebUrl}/api/manga/${params.mangaId}/${chapter}`,
        release_date: $(el).find("span.chapter-release-date > i").text(),
      });
    });

    return NextResponse.json(
      {
        success: true,
        ok: true,
        status: 200,
        data: {
          chapter_list,
          total: chapterItems.length,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        ok: false,
        status: 401,
        message: err.message,
      },
      { status: 401 }
    );
  }
}
