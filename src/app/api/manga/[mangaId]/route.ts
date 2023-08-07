import { fetchHTML, fetchHTML2 } from "@/lib/fetcher";
import { NextResponse } from "next/server";
import { config } from "@/lib/config";
import * as cheerio from "cheerio";
import {
  MangaChapterFull,
  MangaDetailFull,
  ResponseObject,
  ResponseObjectFailed,
} from "@/models/manga";
import { clean } from "@/lib/clean";
import { getPathname } from "@/lib/getPathname";
import { redirect } from "next/navigation";
const { baseScraptUrl, baseWebUrl } = config;
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { mangaId: string } }
): Promise<
  | NextResponse<ResponseObject<MangaDetailFull>>
  | NextResponse<ResponseObjectFailed>
> {
  let mangaId = params.mangaId;

  try {
    const url = await fetchHTML2(`${baseScraptUrl}/manga/${mangaId}`).then(
      (res) => res.url
    );
    const newestMangaId = getPathname(url)?.[2] as string;
    if (mangaId !== newestMangaId) {
      mangaId = newestMangaId;
      console.log(`/api/manga/${newestMangaId}`);
    }
    const html = await fetchHTML(`${baseScraptUrl}/manga/${mangaId}`);
    console.log(mangaId);
    const $ = cheerio.load(html);

    const container = $("div.container");

    const image = container.find(
      "div.tab-summary > div.summary_image > a > img"
    );

    const postContent = container.find(
      "div.col-12 > div.tab-summary > div.summary_content_wrap > div.summary_content > div.post-content"
    );

    const postStatus = container.find(
      "div.col-12 > div.tab-summary > div.summary_content_wrap > div.summary_content > div.post-status"
    );

    const getItemData: (num: number) => string = (num) => {
      return clean(
        postContent
          .find(`div.post-content_item:nth-child(${num}) > div.summary-content`)
          .text()
      );
    };

    const genres: string[] = [];

    const genreContent = postContent.find(
      "div.post-content_item:nth-child(7) > div.summary-content > div.genres-content > a"
    );

    genreContent.each((i, el) => {
      genres.push(clean($(el).text()));
    });

    const chapter_list: MangaChapterFull[] = [];

    $(
      "div.page-content-listing.single-page > div.listing-chapters_wrap > ul.main.version-chap > li.wp-manga-chapter"
    ).each((i, el) => {
      const chapter = (
        getPathname($(el).find("a").attr("href") as string) as string[]
      )[3];

      const release = $(el).find("span.chapter-release-date");

      chapter_list.push({
        chapter: Number(chapter.split("-")[1]),
        id: chapter,
        url: `${baseWebUrl}/api/manga/${mangaId}/${chapter}`,
        release_date:
          release.find("a").length > 0 ? "new" : release.find("i").text(),
      });
    });

    const data: MangaDetailFull = {
      title: $(
        "body > div.wrap > div > div.site-content > div > div.profile-manga.summary-layout-1 > div > div > div > div.post-title > h1"
      ).text(),
      id: mangaId,
      cover_image: {
        src: image.attr("src") ?? "",
        srcset: image.attr("srcset"),
        width: Number(image.attr("width")),
        height: Number(image.attr("height")),
      },
      rating: Number(
        postContent
          .find("div.post-rating > div.post-total-rating > span.score")
          .text()
      ),
      alternative_title: getItemData(4),
      authors: getItemData(5),
      artists: getItemData(6),
      type: getItemData(8),
      genres,
      description:
        $(
          "body > div.wrap > div > div.site-content > div > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div > div.c-page > div > div.description-summary > div.summary__content.show-more > p"
        ).text() ||
        $(
          "body > div.wrap > div > div.site-content > div > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div > div.c-page > div > div.description-summary > div.summary__content.show-more > div.tab-summary"
        ).text(),
      release_date: clean(
        postStatus
          .find("div.post-content_item:nth-child(1) > div.summary-content")
          .text()
      ),
      status: clean(
        postStatus
          .find("div.post-content_item:nth-child(2) > div.summary-content")
          .text()
      ),
      tags: clean(
        $(
          "body > div.wrap > div > div.site-content > div > div.profile-manga.summary-layout-1 > div > div > div > div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(9) > div.summary-content > div"
        ).text()
      ),
      chapter_list,
    };

    return NextResponse.json(
      {
        success: true,
        ok: true,
        status: 200,
        data,
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
