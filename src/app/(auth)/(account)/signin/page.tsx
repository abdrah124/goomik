import SignInPage from "@/components/pages/signin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account - Sign In",
  description: "Sign in to your account",
};

export default function Page() {
  return <SignInPage />;
}
