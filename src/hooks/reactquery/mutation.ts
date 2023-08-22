"use client";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useShowSnackbar } from "@/components/SnackMessage";
import { config } from "@/lib/config";

export const useRegisterAccount = () => {
  const snackMessage = useShowSnackbar();

  const mutation = useMutation({
    mutationFn: (data: any) =>
      axios
        .post(`${config.baseWebUrl}/api/auth/register`, data)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
    onSuccess: () => snackMessage("Account successfully registered", 3000),
    onError: (error: any) => {
      snackMessage(error?.toString() ?? "Something went wrong", 3000);
    },
  });

  return mutation;
};

export const useSendTokenPasswordResetByEmail = () => {
  const mutation = useMutation({
    mutationFn: (data: any) =>
      axios
        .post(`${config.baseWebUrl}/api/auth/resetpassword`, data)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
  });

  return mutation;
};

export const useEditAccountPaswordByToken = (token: string) => {
  const mutation = useMutation({
    mutationFn: (data: any) =>
      axios
        .patch(`${config.baseWebUrl}/api/auth/resetpassword/${token}`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
  return mutation;
};

export const useAddBookmarkItem = () => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (data: { comicId: string; userId: string | undefined }) =>
      axios
        .post(`${config.baseWebUrl}/api/bookmark`, data)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libItems"] });
    },
  });
  return query;
};

export const useAddUser = () => {
  const snackMessage = useShowSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      axios
        .post(`${config.baseWebUrl}/api/auth/register`, data)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
    onSuccess: () => {
      snackMessage("User successfully added", 3000);
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (error: any) => {
      snackMessage(error?.toString() ?? "Something went wrong", 3000);
    },
  });

  return mutation;
};

export const useMutateEditUserDashboard = () => {
  const snackMessage = useShowSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: {
      id: string;
      username: string;
      role: "admin" | "user";
    }) =>
      axios
        .patch(`${config.baseWebUrl}/api/auth/account/${data.id}`, {
          username: data.username,
          role: data.role,
        })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
    onSuccess: () => {
      snackMessage("User detail successfully edited!", 3000);
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: () => {
      snackMessage("Something went wrong!", 3000);
    },
  });

  return mutation;
};

export const useMutateDeleteUserDashboard = () => {
  const snackMessage = useShowSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) =>
      axios
        .delete(`${config.baseWebUrl}/api/auth/account/${id}`)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
    onSuccess: () => {
      snackMessage("Account successfully deleted", 3000);
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (err: any) => {
      snackMessage("Something went wrong!", 3000);
    },
  });

  return mutation;
};
