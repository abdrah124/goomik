import ResetPasswordPage from "@/components/pages/resetpassword";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account - Reset Password",
  description: "Reset your password account",
};

export default function Page() {
  return <ResetPasswordPage />;
}
