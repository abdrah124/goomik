import { ReadingHistory } from "@/context/ReadingHistoryContext";
import { ReadingExtended } from "@/models/manga";

export function getNormalizeHistory(arr: ReadingHistory[]): ReadingExtended[] {
  const itemsRaw: ReadingExtended[] = [];

  arr.forEach((e) => {
    const isExist = itemsRaw.findIndex((item) => item.mangaId === e.mangaId);

    if (isExist === -1)
      itemsRaw.push({
        mangaId: e.mangaId,
        chapters: [{ chapterId: e.chapter, createdAt: e.createdAt }],
      });
    if (isExist !== -1) {
      itemsRaw[isExist].chapters.push({
        chapterId: e.chapter,
        createdAt: e.createdAt,
      });
    }
  });

  return itemsRaw;
}
