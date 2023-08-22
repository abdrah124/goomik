import { z } from "zod";
import {
  addUserSchema,
  newPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "./validationSchema";

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;

export type SignInSchema = z.infer<typeof signInSchema>;

export type SignUpSchema = z.infer<typeof signUpSchema>;

export type AddUserSchema = z.infer<typeof addUserSchema>;
