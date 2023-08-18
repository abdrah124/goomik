import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutBtn from "@/components/LogoutBtn";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

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
        <Typography variant="h4" component="h1">
          {session?.user?.name}
        </Typography>
        <Typography variant="h6" component="h3">
          {session?.user?.email}
        </Typography>
        <LogoutBtn />
      </Stack>
    </Grid>
  );
}
