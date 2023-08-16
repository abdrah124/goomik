type MangaTitle = string;
type MangaRating = number;
type MangaId = string;

export type ResponseObject<T> = {
  status: number;
  success: true;
  ok: true;
  data: T;
};

export interface ResponseObjectFailed {
  status: number;
  success: false;
  ok: false;
  message: string;
}

export type PagingObject<T> = {
  items: T;
  prev: string | null;
  next: string | null;
};

export type PagingObjectSearch<T> = PagingObject<T> & {
  total: number;
  total_page: number | null;
};

export interface MangaChapter {
  chapter: number;
  id: string;
  url: string;
}

export interface MangaChapterFull extends MangaChapter {
  release_date: string | "new" | null;
}

interface MangaCover {
  url: string;
  srcset?: string;
  width?: number;
  height?: number;
}

export interface MangaItemSimplified {
  title: MangaTitle;
  id: MangaId;
  latest_chapter: MangaChapter[];
  image: MangaCover;
}

export interface MangaItemFull extends MangaItemSimplified {
  rating: MangaRating;
}

export interface MangaDetailSimplified {
  title: string;
  id: string;
  cover_image: {
    src: string;
    srcset?: string;
    width?: number;
    height?: number;
  };
  rating?: number;
  alternative_title?: string;
  authors?: string;
  artists?: string;
  genres?: string[];
  status?: string;
  release_date?: string | number;
  chapter_list: MangaChapterFull[];
}

export interface MangaDetailFull extends MangaDetailSimplified {
  type?: string;
  tags?: string[] | string;
  synopsis?: string;
  description?: string;
}

export type BookmarkItemSimplified = {
  id: string;
};

export type BookmarkItem =
  | ({
      userId: string;
      createdAt: Date;
      comicId: string;
    } & BookmarkItemSimplified)
  | null;

export type BookmarkItems = BookmarkItem[] | [];
