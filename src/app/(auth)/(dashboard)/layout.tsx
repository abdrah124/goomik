import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session === null) redirect("/signin");

  return session?.user?.role === "admin" ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    "This page just can be accessed by admin"
  );
}
