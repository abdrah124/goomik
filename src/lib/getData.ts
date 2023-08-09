import {
  MangaChapterFull,
  MangaDetailFull,
  MangaDetailSimplified,
  MangaItemFull,
  PagingObjectSearch,
  ResponseObject,
} from "@/models/manga";
import {
  allMangaChapters,
  genre as genreEndpoint,
  genreList,
  getMangaCategory,
  mangaDetail,
  mangaSingleChapter,
  search,
} from "./apiEndpoint";
import { FetcherOptions, fetcher } from "./fetcher";

export const getGenreList: () => Promise<
  ResponseObject<{ genres: string[] }>
> = () =>
  fetch(genreList)
    .then((response) => response.json())
    .catch((err) => Promise.reject(err));

export const getMangaByGenre: (
  genre: string,
  page?: number,
  order_by?: string,
  options?: FetcherOptions
) => Promise<ResponseObject<PagingObjectSearch<MangaItemFull[]>>> = async (
  genre,
  page = 1,
  order_by = "",
  options
) => {
  const data = await fetcher(genreEndpoint(genre, page, order_by), options);
  return data;
};

export const getSearchResults: (
  q?: string,
  page?: number,
  order_by?: string,
  options?: FetcherOptions
) => Promise<
  ResponseObject<PagingObjectSearch<MangaDetailSimplified[]>>
> = async (q, page, order_by, options) => {
  const data = await fetcher(search(q, page, order_by), options);
  return data;
};

export const getMangaByCategory: (
  type: "latest" | "popular" | "trending",
  page?: number,
  options?: FetcherOptions
) => Promise<
  ResponseObject<PagingObjectSearch<MangaDetailSimplified[]>>
> = async (type, page = 1, options) => {
  const data = await fetcher(getMangaCategory(type, page), options);
  return data;
};

export const getMangaDetail: (
  mangaId: string,
  options?: FetcherOptions
) => Promise<ResponseObject<MangaDetailFull>> = async (mangaId, options) => {
  const data = await fetcher(mangaDetail(mangaId), options);
  return data;
};

export const getMangaChapter: (
  mangaId: string,
  chapterId: string,
  options?: FetcherOptions
) => Promise<
  ResponseObject<{
    title: string;
    images: string[];
    next: string;
    prev: string;
  }>
> = async (mangaId, chapterId, options = { revalidate: false }) => {
  const data = await fetcher(mangaSingleChapter(mangaId, chapterId), options);
  return data;
};

export const getMangaChapterList: (
  mangaId: string,
  options?: FetcherOptions
) => Promise<
  ResponseObject<{ chapter_list: MangaChapterFull[]; total: number }>
> = async (mangaId, options = { revalidate: false }) => {
  const data = await fetcher(allMangaChapters(mangaId), options);
  return data;
};
