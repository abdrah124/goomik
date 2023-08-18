"use client";
import { config } from "@/lib/config";
import { $Enums } from "@prisma/client";
import axios from "axios";
import { useQuery } from "react-query";

type UserProfile = {
  id: string;
  email: string | null;
  emailVerified: string | null;
  name: string | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: $Enums.Role;
} | null;

export default function useGetMe(): UserProfile {
  const {
    data: me,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<{
    id: string;
    email: string | null;
    emailVerified: string | null;
    name: string | null;
    image: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: $Enums.Role;
  } | null>({
    queryKey: ["me"],
    queryFn: () =>
      axios
        .get(`${config.baseWebUrl}/api/auth/account/me`)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
  });

  if (isLoading || isError) return null;

  if (isSuccess) return me;
  return null;
}
