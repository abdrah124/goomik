import { config } from "./config";
const { baseWebUrl } = config;

export const getMangaCategory = (type: string, page?: number) =>
  `${baseWebUrl}/api/manga/${type}?page=${page ?? 1}`;

export const genre: (
  genre: string,
  page?: number,
  order_by?: string
) => string = (genre, page = 1, order_by = "") =>
  `${baseWebUrl}/api/genre?genre=${genre}&page=${page}&order_by=${order_by}`;

export const search: (
  q?: string,
  page?: number,
  order_by?: string
) => string = (
  q = "",

  page = 1,
  order_by = ""
) => `${baseWebUrl}/api/search?q=${q}&order_by=${order_by}&page=${page}`;

export const latestMangas = (page: number) =>
  getMangaCategory("latest", page ?? 1);
export const trendingMangas = (page: number) =>
  getMangaCategory("trending", page ?? 1);
export const popularMangas = (page: number) =>
  getMangaCategory("popular", page ?? 1);

export const allMangaChapters: (mangaId: string) => string = (mangaId) =>
  `${baseWebUrl}/api/manga/${mangaId}/chapter/all`;

export const mangaSingleChapter: (
  mangaId: string,
  chapterId: string
) => string = (mangaId, chapterId) =>
  `${baseWebUrl}/api/manga/${mangaId}/${chapterId}`;

export const mangaDetail: (mangaId: string) => string = (mangaId) =>
  `${baseWebUrl}/api/manga/${mangaId}`;

export const genreList = `${baseWebUrl}/api/genre/all`;
