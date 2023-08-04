import { MangaChapter, MangaItemFull } from "@/models/manga";
import * as cheerio from "cheerio";
import { getPathname } from "./getPathname";
import { config } from "./config";
const { baseWebUrl } = config;

export const getMangaItem: (
  el: cheerio.Cheerio<cheerio.Element>,
  $: cheerio.CheerioAPI
) => MangaItemFull[] = (el, $) => {
  const datas: MangaItemFull[] = [];

  el.each((i, el) => {
    const img = $(el).find("div.item-thumb > a > img");
    const title = $(el)
      .find("div.item-summary > div.post-title > h3.h5 > a")
      .text();

    const id = getPathname(
      $(el)
        .find("div.item-summary > div.post-title > h3.h5 > a")
        .attr("href") as string
    )[2];

    const chapters = $(el).find(
      "div.item-summary > div.list-chapter > div.chapter-item > span.chapter > a"
    );

    const latest_chapter: MangaChapter[] = [];
    chapters.each((i, el) => {
      const chapter = getPathname($(el).attr("href") as string)[3];

      latest_chapter.push({
        chapter: Number(chapter.split("-")[1]),
        id: chapter,
        url: `${baseWebUrl}/api/manga/${id}/${chapter}`,
      });
    });

    datas.push({
      title,
      rating: Number(
        $(el)
          .find(
            "div.item-summary > div.meta-item.rating > div.post-total-rating > span.score.font-meta.total_votes"
          )
          .text()
      ),
      latest_chapter,
      id,
      image: {
        url: img.attr("src") ?? "",
        srcset: img.attr("srcset"),
        width: Number(img.attr("width")),
        height: Number(img.attr("height")),
      },
    });
  });

  return datas;
};
