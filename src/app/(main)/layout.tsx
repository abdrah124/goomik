import DrawerAppBar from "@/components/AppBar";
import SnackMessage, { SnackContext } from "@/components/SnackMessage";
import { fonts } from "@/fonts/fonts";
import { Analytics } from "@vercel/analytics/react";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackContext>
      <html lang="en">
        <body className={fonts + " pt-16 sm:pt-20 pb-4 "}>
          <DrawerAppBar />
          {children}
          <SnackMessage />
          <Analytics />
        </body>
      </html>
    </SnackContext>
  );
}
