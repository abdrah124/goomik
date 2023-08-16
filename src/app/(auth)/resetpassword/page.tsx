"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useShowSnackbar } from "@/components/SnackMessage";
import { config } from "@/lib/config";
import {
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  // verificationCode: z.string().max(4),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function Page() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (data: any) =>
      axios
        .post(`${config.baseWebUrl}/api/auth/resetpassword`, data)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
  });
  const snackMessage = useShowSnackbar();

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutate(data, {
      onError: (error: any) => {
        snackMessage(error?.toString() ?? "Something went wrong", 3000);
      },
      onSuccess: (data) =>
        snackMessage("Verification code has been sent to your email", 3000),
    });
  };

  return (
    <div className="w-full p-6 flex justify-center items-center min-h-[90vh] md:items-start md:min-h-0">
      <Paper
        onSubmit={handleSubmit(onSubmit)}
        elevation={7}
        component="form"
        sx={{
          marginY: "auto",
          width: "100%",
          maxWidth: 400,
          p: 2,
          pt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h1" mb={4} fontWeight={700}>
          Password recovery
        </Typography>
        <Stack direction="column" sx={{ width: "100%" }} gap={4}>
          <TextField
            required
            error={errors.email !== undefined}
            label="Email"
            id="email"
            {...register("email")}
            fullWidth
            helperText={errors.email !== undefined ? errors.email.message : ""}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          width="100%"
        >
          <Button
            disabled={isLoading}
            variant="contained"
            fullWidth
            type="submit"
          >
            Send verification url
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
