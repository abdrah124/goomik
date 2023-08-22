import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutBtn from "@/components/LogoutBtn";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Account - Profile",
  description: "Account profile information",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session === null) redirect("/signin");

  return (
    <Grid
      item
      xs={12}
      sx={{
        width: "100%",
        position: "absolute",
        transform: "translate(-50%,-50%)",
        left: "50%",
        top: "50%",
      }}
    >
      <Stack
        direction="column"
        gap={2}
        alignItems="center"
        width="100%"
        sx={{ marginX: "auto" }}
      >
        <Avatar
          src={session?.user?.image ?? ""}
          alt={session?.user?.name ?? ""}
          sx={{ width: 130, height: 130 }}
        />
        <Typography variant="h5" component="h2" align="center">
          {session?.user?.name}
        </Typography>
        <Typography align="center" variant="h6" component="h3">
          {session?.user?.email}
        </Typography>
        <LogoutBtn />
      </Stack>
    </Grid>
  );
}
