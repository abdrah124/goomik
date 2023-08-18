import SnackMessage, { SnackContext } from "@/components/SnackMessage";
import { fonts } from "@/fonts/fonts";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts}>
        <SnackContext>
          {children}
          <SnackMessage />
        </SnackContext>
      </body>
    </html>
  );
}
