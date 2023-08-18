import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutBtn from "@/components/LogoutBtn";
import prisma from "@/lib/prismadb";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const myAccount = await prisma.user.findUnique({
    where: {
      email: session?.user.email ?? "",
    },
  });

  return (
    <Grid item xs={12} sx={{ width: "100%" }}>
      <Stack
        direction="column"
        gap={2}
        alignItems="center"
        width="100%"
        sx={{ marginX: "auto" }}
      >
        <Avatar
          src={myAccount?.image ?? ""}
          alt={myAccount?.name ?? ""}
          sx={{ width: 130, height: 130 }}
        />
        <Typography variant="h4" component="h1">
          {myAccount?.name}
        </Typography>
        <Typography variant="h6" component="h3">
          {myAccount?.email}
        </Typography>
        <LogoutBtn />
      </Stack>
    </Grid>
  );
}
