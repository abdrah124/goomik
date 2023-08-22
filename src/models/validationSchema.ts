import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Name must be at least 4 characters or higher" })
      .max(30, { message: "Password must be lower than 30 characters" }),
    confirmNewPassword: z.string(),
  })
  .refine((val) => val.confirmNewPassword === val.newPassword, {
    message: "Password don't match",
    path: ["confirmNewPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string(),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name must be at least 4 words or higher" })
      .max(30, { message: "Name must be lower than 30 words" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Name must be at least 4 characters or higher" })
      .max(30, { message: "Password must be lower than 30 characters" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

export const addUserSchema = z.object({
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
