export interface User {
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface Bookmark {
  id: string;
  userId: string;
  createdAt: Date;
  comicId: string;
}

export interface UserBookmark extends User {
  bookmarks: Bookmark[];
}

export type UserWithBookmarks = UserBookmarks[];
