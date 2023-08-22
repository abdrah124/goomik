"use client";
import { config } from "@/lib/config";
import {
  MangaDetailFull,
  MangaDetailSimplified,
  PagingObject,
  ResponseObject,
} from "@/models/manga";
import { $Enums } from "@prisma/client";
import axios from "axios";
import { useQuery } from "react-query";

interface User {
  id: string;
  email: string | null;
  emailVerified: string | null;
  name: string | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: $Enums.Role;
}

type Users = User[];

export const useGetUserBookmarks = (userId: string | undefined) => {
  const query = useQuery<{
    bookmarks: {
      comicId: string;
    }[];
  } | null>({
    queryKey: ["libItems", userId],
    queryFn: () =>
      axios
        .get(`${config.baseWebUrl}/api/bookmark/${userId}`)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
    enabled: userId !== undefined || userId !== null,
  });

  return query;
};

export const useGetAllUsers = () => {
  const query = useQuery<Users>({
    queryKey: ["Users"],
    queryFn: () =>
      axios
        .get(`${config.baseWebUrl}/api/auth/account/all`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useGetMangaDetail = (id: string) => {
  const query = useQuery<MangaDetailFull>({
    queryKey: ["Library Items", id],
    queryFn: () =>
      fetch(`${config.baseWebUrl}/api/manga/${id}`, { next: { revalidate: 0 } })
        .then((res) => res.json())
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: id !== "",
    staleTime: 3600,
  });
  return query;
};

export const useGetSearchResult = (input: string) => {
  const query = useQuery<ResponseObject<PagingObject<MangaDetailSimplified[]>>>(
    {
      queryKey: ["Search Results", input],
      queryFn: () =>
        fetch(`${config.baseWebUrl}/api/search?q=${input.trim()}`, {
          next: { revalidate: 3600 },
        })
          .then((res) => res.json())
          .catch((err) => Promise.reject(err)),
      retry: 0,
      enabled: input.length > 0,
    }
  );

  return query;
};
