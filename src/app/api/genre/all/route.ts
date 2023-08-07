import { config } from "@/lib/config";
import { fetchHTML } from "@/lib/fetcher";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { getPathname } from "@/lib/getPathname";
import { ResponseObject, ResponseObjectFailed } from "@/models/manga";
const { baseScraptUrl } = config;

export async function GET(): Promise<
  | NextResponse<ResponseObject<{ genres: string[] }>>
  | NextResponse<ResponseObjectFailed>
> {
  try {
    const html = await fetchHTML(`${baseScraptUrl}`);
    const $ = cheerio.load(html);
    const genreListContainer = $(
      "div.genres_wrap > div.row > div.col-md-12 div.widget-content"
    );
    const genreItem = genreListContainer.find("li.col-xs-6.col-sm-4 > a");
    const genres: string[] = [];

    genreItem.each((i, el) => {
      if (($(el).attr("href") ?? []).length > 0)
        genres.push(
          $(el).attr("href")?.includes("%")
            ? "villainess"
            : (getPathname($(el).attr("href") as string) as string[])[2]
        );
    });

    return NextResponse.json(
      {
        status: 200,
        ok: true,
        success: true,
        data: {
          genres,
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
