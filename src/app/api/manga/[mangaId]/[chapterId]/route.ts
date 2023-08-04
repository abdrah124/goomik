import { config } from "@/lib/config";
import { fetchHTML } from "@/lib/fetcher";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { clean } from "@/lib/clean";
import { ResponseObject, ResponseObjectFailed } from "@/models/manga";
const { baseScraptUrl } = config;

export async function GET(
  request: Request,
  { params }: { params: { mangaId: string; chapterId: string } }
): Promise<
  | NextResponse<ResponseObject<{ title: string; images: string[] }>>
  | NextResponse<ResponseObjectFailed>
> {
  const { mangaId, chapterId } = params;
  try {
    const html = await fetchHTML(
      `${baseScraptUrl}/manga/${mangaId}/${chapterId}`
    );

    const $ = cheerio.load(html);
    const images: string[] = [];
    const title = $("h1#chapter-heading").text();
    const imageItems = $(
      "body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-content > div > div > div > div > img"
    ).each((i, el) => {
      images.push(clean($(el).attr("src") as string));
    });

    if (imageItems.length === 0) throw new Error("Not found");

    return NextResponse.json({
      success: true,
      ok: true,
      status: 200,
      data: {
        title,
        images,
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
