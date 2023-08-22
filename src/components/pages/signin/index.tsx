"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useShowSnackbar } from "@/components/SnackMessage";
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
  Divider,
  useTheme,
} from "@mui/material";
import LinkNext from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SignInSchema } from "@/models/validationTypeSchema";
import { signInSchema } from "@/models/validationSchema";
import { Metadata } from "next";

export default function SignInPage() {
  const theme = useTheme();
  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const snackMessage = useShowSnackbar();

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response?.error) throw new Error("Sign In failed!");
      snackMessage("Sign In successfull", 3000);
    } catch (err: any) {
      snackMessage(err.message, 3000);
    } finally {
      setIsLoading(false);
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
          Sign In
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
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography
            variant="subtitle2"
            sx={{
              margin: 0,
              display: "block",
              height: "fit-content",
            }}
            component={LinkNext}
            className={
              theme.palette.mode === "dark"
                ? "text-blue-300 visited:text-blue-300"
                : "text-blue-600 visited:text-blue-600"
            }
            href="/resetpassword"
          >
            Forgot password?
          </Typography>
          <Button disabled={isLoading} variant="contained" type="submit">
            Sign In
            {isLoading && (
              <CircularProgress color="inherit" size={20} sx={{ ml: 2 }} />
            )}
          </Button>
        </Stack>{" "}
        <Divider sx={{ width: "100%" }}>or</Divider>
        <Button
          startIcon={
            <Image src="/google_logo.svg" width={20} height={20} alt="google" />
          }
          variant="outlined"
          fullWidth
          onClick={() => signIn("google", { redirect: false })}
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "#383838" : "#FFF",
            border: theme.palette.mode === "dark" ? "none" : null,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? "primary.main" : "#DDD",
              color: theme.palette.mode === "dark" ? "#000" : "#FFF",
              border: "none",
            },
            color: theme.palette.mode === "light" ? "#000" : "#FFF",
          }}
        >
          Sign In with google
        </Button>
        <Typography
          variant="subtitle2"
          sx={{
            margin: 0,
            display: "block",
            height: "fit-content",
            alignSelf: "start",
          }}
        >
          Don&apos;t have account?{" "}
          <Link
            href="/signup"
            component={LinkNext}
            className={
              theme.palette.mode === "dark"
                ? "text-blue-300 visited:text-blue-300"
                : "text-blue-600 visited:text-blue-600"
            }
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}
