"use client";
import React from "react";
import { ConfirmProvider } from "material-ui-confirm";

export default function ConfirmContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfirmProvider>{children}</ConfirmProvider>;
}
