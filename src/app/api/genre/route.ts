import { config } from "@/lib/config";
import { fetchHTML } from "@/lib/fetcher";
import { NextResponse } from "next/server";
const { baseScraptUrl, baseWebUrl } = config;
import * as cheerio from "cheerio";
import { getMangaItem } from "@/lib/getMangaItem";
import {
  MangaItemFull,
  PagingObject,
  PagingObjectSearch,
  ResponseObject,
  ResponseObjectFailed,
} from "@/models/manga";
import { clean } from "@/lib/clean";

export async function GET(
  request: Request
): Promise<
  | NextResponse<ResponseObject<PagingObjectSearch<MangaItemFull[]>>>
  | NextResponse<ResponseObjectFailed>
> {
  const url = new URL(request.url);
  const { searchParams } = url;
  const genre = searchParams.get("genre");
  const page = searchParams.get("page") ?? 1;
  const order_by = searchParams.get("order_by") ?? "";
  try {
    if (!genre) throw new Error("No genre provided");
    const html = await fetchHTML(
      `${baseScraptUrl}/manga-genre/${genre}/page/${page}/?m_orderby=${order_by}`
    );

    const $ = cheerio.load(html);

    const content = $(".c-page__content");
    const contentItem = content.find("div.page-item-detail.manga");

    const datas: MangaItemFull[] = getMangaItem(contentItem, $);

    const total_page = Number(
      clean($("div.wp-pagenavi > span.pages").text().split(" ")[3])
    );

    const total = Number(
      clean(
        $("div.main-col > div.main-col-inner > div.c-page div.h4")
          .text()
          .replaceAll('"', "")
      ).split(" ")[0]
    );

    return NextResponse.json(
      {
        status: 200,
        ok: true,
        success: true,
        data: {
          items: datas,
          next: `${baseWebUrl}/api/genre?genre=${genre}&page=${
            Number(page) + 1
          }&order_by=${order_by}`,
          prev:
            Number(page) > 1
              ? `${baseWebUrl}/api/genre?genre=${genre}&page=${
                  Number(page) - 1
                }&order_by=${order_by}`
              : null,
          total_page,
          total,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        ok: false,
        status: err.message === "Not found" ? 404 : 401,
        message: err.message,
      },
      { status: err.message === "Not found" ? 404 : 401 }
    );
  }
}
