import { config } from "@/lib/config";
import * as cheerio from "cheerio";
import { fetchHTML } from "@/lib/fetcher";
import { NextResponse } from "next/server";
import {
  MangaChapterFull,
  MangaDetailSimplified,
  PagingObjectSearch,
  ResponseObject,
  ResponseObjectFailed,
} from "@/models/manga";
import { getPathname } from "@/lib/getPathname";
import { clean } from "@/lib/clean";
// import { puppeteerLaunch } from "@/lib/puppeteer";
const { baseScraptUrl, baseWebUrl } = config;

export async function GET(
  request: Request
): Promise<
  | NextResponse<ResponseObject<PagingObjectSearch<MangaDetailSimplified[]>>>
  | NextResponse<ResponseObjectFailed>
> {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const order_by = searchParams.get("order_by") || "relevance";
  try {
    const html = await fetchHTML(
      `${baseScraptUrl}/page/${page}/?s=${q}&post_type=wp-manga&m_orderby=${order_by}`
    );

    const $ = cheerio.load(html);
    // await puppeteerLaunch(async (pg, browser) => {
    //   await pg.goto(
    //     `${baseScraptUrl}/page/${page}/?s=${q}&post_type=wp-manga&m_orderby=${order_by}`
    //   );

    //   await pg.waitForSelector("div.search-wrap div.c-tabs-item");

    //   const element = await pg.$$eval(
    //     "div.col-4 > div.tab-thumb > a > img",
    //     (images) => {
    //       return images.map(
    //         (image) =>
    //           image.getAttribute("data-src") || image.getAttribute("src")
    //       );
    //     }
    //   );
    //   await browser.close();
    // });
    const container = $(
      "div.search-wrap > div.tab-content-wrap div.c-tabs-item"
    );

    const items = container.find("div.row.c-tabs-item__content");

    const datas: MangaDetailSimplified[] = [];

    items.each((i, el) => {
      const a = $(el).find(
        "div.col-8 > div.tab-summary > div.post-title > h3.h4 > a"
      );
      const id = (getPathname(a.attr("href") as string) as string[])[2];
      const title = a.text();
      const image = $(el).find("div.col-4 > div.tab-thumb > a > img");

      const post_content = $(el).find(
        "div.col-8 > div.tab-summary > div.post-content"
      );

      const meta = $(el).find("div.col-8 > div.tab-meta");

      const alt_title = post_content.find(
        "div.post-content_item.mg_alternative div.summary-content"
      );

      const genres: string[] = [];

      post_content
        .find("div.post-content_item.mg_genres div.summary-content > a")
        .each((i, el) => {
          genres.push($(el).text());
        });

      const chapter_list: MangaChapterFull[] = [];

      $(el)
        .find("div.col-8 > div.tab-meta")
        .each((i, element) => {
          const chapter = (
            getPathname($(element).find("a").attr("href") as string) as string[]
          )[3];

          const isNew = $(el).find("div.meta-item.post-on > span.font-meta");

          chapter_list.push({
            chapter: Number(chapter.split("-")[1]),
            id: chapter,
            url: `${baseWebUrl}/api/manga/${id}/${chapter}`,
            release_date: isNew.find("a").length > 0 ? "new" : isNew.text(),
          });
        });

      datas.push({
        id,
        title,
        cover_image: {
          src:
            image.attr("data-src") ??
            (image.attr("srcset")?.split(" ")[0] as string) ??
            image.attr("set")?.split(" ")[0],
          srcset: image.attr("srcset"),
          width: Number(image.attr("width")),
          height: Number(image.attr("height")),
        },
        alternative_title: clean(alt_title.text()),
        authors: clean(
          post_content
            .find("div.post-content_item.mg_author div.summary-content")
            .text()
        ),
        artists: clean(
          post_content
            .find("div.post-content_item.mg_artists div.summary-content")
            .text()
        ),
        genres,
        status: clean(
          post_content
            .find("div.post-content_item.mg_status div.summary-content")
            .text()
        ),
        release_date: clean(
          post_content
            .find("div.post-content_item.mg_release div.summary-content")
            .text()
        ),
        rating: Number(meta.find("div.post-total-rating > span.score").text()),
        chapter_list,
      });
    });

    const total = Number($("div.c-blog__heading > h1.h4").text().split(" ")[1]);

    const total_page = Number(
      clean(
        $(
          "body > div.wrap > div > div.site-content > div.c-page-content > div > div > div > div > div.main-col-inner > div > div.tab-content-wrap > div.col-12.col-md-12 > div > span.pages"
        ).text()
      ).split(" ")[3]
    );

    if (page > 1 && total <= 12) throw new Error("Not found");
    return NextResponse.json({
      success: true,
      ok: true,
      status: 200,
      data: {
        items: datas,
        next:
          total > 12
            ? `${baseWebUrl}/api/search?q=${q}&order_by=${order_by}&page=${
                page + 1
              }`
            : null,
        prev:
          page > 1
            ? `${baseWebUrl}/api/search?q=${q}&order_by=${order_by}&page=${
                page - 1
              }`
            : null,
        total,
        total_page,
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      ok: false,
      status: err.message === "Not found" ? 404 : 401,
      message: err.message,
    });
  }
}
