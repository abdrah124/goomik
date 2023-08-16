"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import { Button, Stack, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const data = useSession();
  const router = useRouter();

  const isNotAuthenticated = data?.status === "unauthenticated";

  useEffect(() => {
    if (isNotAuthenticated) router.push("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotAuthenticated]);

  return (
    <>
      {/* <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography variant="h6"> {JSON.stringify(data)}</Typography>
        <Button variant="contained" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Stack> */}
      <Dashboard />
    </>
  );
}
