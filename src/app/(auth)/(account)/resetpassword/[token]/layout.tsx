import prisma from "@/lib/prismadb";
import { Alert, AlertTitle } from "@mui/material";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { token: string };
}) {
  const isValidToken = await prisma.resetToken.findFirst({
    where: {
      token: params.token,
    },
  });

  if (!isValidToken) redirect("/");
  const isExpired =
    Date.parse(isValidToken.expireAt as unknown as string) < Date.now();

  return (
    <div className="w-full p-6 flex justify-center items-center min-h-[90vh] md:items-start md:min-h-0">
      {isExpired ? (
        <Alert severity="error">
          <AlertTitle>Reset token already expired!</AlertTitle>
          Provided reset token is already expired —{" "}
          <Link href="/resetpassword">
            <strong>generate new token?</strong>
          </Link>
        </Alert>
      ) : (
        children
      )}
    </div>
  );
}
