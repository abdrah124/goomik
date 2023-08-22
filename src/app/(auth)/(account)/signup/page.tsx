import SignUpPage from "@/components/pages/signup";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account - SIgn Up",
  description: "Create or register your account",
};

export default function Page() {
  return <SignUpPage />;
}
