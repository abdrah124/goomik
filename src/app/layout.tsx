import DrawerAppBar from "@/components/AppBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Quicksand, Poppins, Cabin, Roboto } from "next/font/google";
import React from "react";
import { PageLayout } from "@/models/pageLayout";
import RootTheme from "@/components/theme/RootTheme";
import QueryProvider from "@/components/utils/QueryProvider";
import { ThemePalleteMode } from "@/components/ThemeToggler";
import { Button, CssBaseline } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const inter = Inter({ subsets: ["latin"] });
const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--quicksand",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--poppins",
});

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--cabin",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--roboto",
});

export const metadata: Metadata = {
  title: "Goomik",
  description: "read manhwa, manga, manhua, all genres, fast update here",
  viewport: "initial-scale=1, width=device-width",
};

const fonts = [
  inter.className,
  cabin.variable,
  poppins.variable,
  quickSand.variable,
  roboto.variable,
].join(" ");

interface PageLayoutProps extends PageLayout {}

export default function RootLayout({ children }: PageLayoutProps) {
  return (
    <RootTheme>
      <ThemePalleteMode>
        <html lang="en">
          <body className={fonts + " pt-16 sm:pt-20 pb-4 "}>
            <QueryProvider>
              <DrawerAppBar />
              {children}
            </QueryProvider>
          </body>
        </html>
      </ThemePalleteMode>
    </RootTheme>
  );
}
