"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useShowSnackbar } from "@/components/SnackMessage";
import { config } from "@/lib/config";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useParams, useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NewPasswordSchema } from "@/models/validationTypeSchema";
import { newPasswordSchema } from "@/models/validationSchema";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const params = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
  });
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data: any) =>
      axios
        .patch(
          `${config.baseWebUrl}/api/auth/resetpassword/${params.token}`,
          data
        )
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
  const snackMessage = useShowSnackbar();

  const onSubmit: SubmitHandler<NewPasswordSchema> = async (data) => {
    try {
      await mutateAsync(data);
      if (isError) throw new Error("");
      snackMessage("Password successfully changed", 3000);
      await new Promise((resolve) =>
        setTimeout(() => resolve(router.push("/signin")), 3000)
      );
    } catch (err) {
      snackMessage(
        // @ts-ignore
        error?.response?.data?.message ?? "Something went wrong",
        3000
      );
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
            error={errors.newPassword !== undefined}
            label="New Password"
            id="newpassword"
            type={showPassword ? "text" : "password"}
            {...register("newPassword")}
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
            helperText={
              errors.newPassword !== undefined ? errors.newPassword.message : ""
            }
            fullWidth
          />
          <TextField
            required
            type={showConfirmPassword ? "text" : "password"}
            error={errors.confirmNewPassword !== undefined}
            label="Confirm new password"
            id="confirmnewpassword"
            {...register("confirmNewPassword")}
            fullWidth
            helperText={
              errors.confirmNewPassword !== undefined
                ? errors.confirmNewPassword.message
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            Change password
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
