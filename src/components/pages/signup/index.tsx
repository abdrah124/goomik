"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useShowSnackbar } from "@/components/SnackMessage";
import { config } from "@/lib/config";
import {
  Button,
  FormControl,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  IconButton,
  InputLabel,
  useTheme,
} from "@mui/material";
import LinkNext from "next/link";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SignUpSchema } from "@/models/validationTypeSchema";
import { signUpSchema } from "@/models/validationSchema";
import { Metadata } from "next";

export default function SignUpPage() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) =>
      axios
        .post(`${config.baseWebUrl}/api/auth/register`, data)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err?.response?.data?.message);
        }),
  });
  const snackMessage = useShowSnackbar();

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    mutate(data, {
      onSuccess: () => snackMessage("Account successfully registered", 3000),
      onError: (error: any) => {
        snackMessage(error?.toString() ?? "Something went wrong", 3000);
      },
    });
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
          Sign Up
        </Typography>
        <Stack direction="column" sx={{ width: "100%" }} gap={4}>
          <TextField
            required
            id="username"
            aria-label="username"
            error={errors.name !== undefined}
            {...register("name")}
            label="Username"
            fullWidth
            helperText={
              errors.name !== undefined
                ? errors.name.message
                : "Input your username"
            }
          />

          <TextField
            required
            error={errors.email !== undefined}
            label="Email"
            id="email"
            {...register("email")}
            fullWidth
            helperText={errors.email !== undefined ? errors.email.message : ""}
          />
          <FormControl required fullWidth>
            <InputLabel
              htmlFor="password"
              error={errors.password !== undefined}
            >
              Password
            </InputLabel>
            <OutlinedInput
              required
              error={errors.password !== undefined}
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              endAdornment={
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
              }
              fullWidth
            />
            <FormHelperText error={errors.password !== undefined}>
              {errors.password !== undefined ? errors.password.message : ""}
            </FormHelperText>
          </FormControl>
          <FormControl required fullWidth>
            <InputLabel
              htmlFor="confirmpassword"
              error={errors.confirm !== undefined}
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              required
              error={errors.confirm !== undefined}
              id="confirmpassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirm")}
              label="Confirm Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
            />
            <FormHelperText error={errors.confirm !== undefined}>
              {errors.confirm !== undefined ? errors.confirm.message : ""}
            </FormHelperText>
          </FormControl>
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
            Sign Up
            {isLoading && (
              <CircularProgress color="inherit" size={20} sx={{ ml: 2 }} />
            )}
          </Button>
        </Stack>{" "}
        <Typography
          variant="subtitle2"
          sx={{
            margin: 0,
            display: "block",
            height: "fit-content",
            alignSelf: "start",
          }}
        >
          Already have account?{" "}
          <Link
            href="/signin"
            component={LinkNext}
            className={
              theme.palette.mode === "light"
                ? "text-blue-600 visited:text-blue-600"
                : "text-blue-300 visited:text-blue-300"
            }
          >
            Sign In
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}
