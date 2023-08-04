import DrawerAppBar from "@/components/AppBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { PageLayout } from "@/models/pageLayout";
import RootTheme from "@/components/theme/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goomik",
  description: "read manhwa, manga, manhua, all genres, fast update here",
  viewport: "initial-scale=1, width=device-width",
};

interface PageLayoutProps extends PageLayout {}

export default function RootLayout({ children }: PageLayoutProps) {
  return (
    <html lang="en">
      <RootTheme>
        <body className={inter.className + " pt-16 sm:pt-20 pb-4"}>
          <DrawerAppBar />
          {children}
        </body>
      </RootTheme>
    </html>
  );
}
