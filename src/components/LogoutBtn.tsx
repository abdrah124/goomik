"use client";
import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutBtn() {
  const confirm = useConfirm();
  return (
    <Button
      startIcon={<Logout />}
      onClick={async () => {
        await confirm({
          description: "Logout from this account?",
          title: "Logout",
          cancellationText: "Cancel",
          confirmationText: "Logout",
          cancellationButtonProps: {
            variant: "outlined",
          },
          confirmationButtonProps: {
            variant: "contained",
            color: "error",
          },
        });
        signOut();
      }}
      variant="contained"
    >
      Logout
    </Button>
  );
}
