"use client";
import { config } from "@/lib/config";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";
import { useShowSnackbar } from "../SnackMessage";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 words or higher" })
    .max(30, { message: "Name must be lower than 30 words" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Name must be at least 4 characters or higher" })
    .max(30, { message: "Password must be lower than 30 characters" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function UserAddForm() {
  const snackMessage = useShowSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) });

  const { mutate: addUser, isLoading: loadAddUser } = useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      axios
        .post(`${config.baseWebUrl}/api/auth/register`, data)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    addUser(data, {
      onSuccess: () => {
        snackMessage("User successfully added", 3000);
        queryClient.invalidateQueries(["Users"]);
      },
      onError: (error: any) => {
        snackMessage(error?.toString() ?? "Something went wrong", 3000);
      },
    });
    reset();
  };
  return (
    <Paper
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: "column",
        maxWidth: 400,
        p: 2,
        my: 2,
        alignSelf: "end",
        width: "100%",
      }}
      onSubmit={handleSubmit(onSubmit)}
      component="form"
    >
      <Typography variant="h5" component="h2">
        Add User
      </Typography>
      <TextField
        label="Username"
        fullWidth
        {...register("name")}
        id="username"
        aria-label="username"
        error={errors.name !== undefined}
        {...register("name")}
        helperText={errors.name !== undefined ? errors.name.message : ""}
      />
      <TextField
        label="Email"
        fullWidth
        {...register("email")}
        error={errors.email !== undefined}
        id="email"
        {...register("email")}
        helperText={errors.email !== undefined ? errors.email.message : ""}
      />
      <TextField
        label="Password"
        fullWidth
        {...register("password")}
        error={errors.password !== undefined}
        id="password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loadAddUser}
        endIcon={
          loadAddUser ? (
            <CircularProgress color="inherit" size={20} sx={{ ml: 2 }} />
          ) : (
            ""
          )
        }
      >
        add user
      </Button>
    </Paper>
  );
}
