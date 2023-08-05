import DrawerAppBar from "@/components/AppBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Quicksand, Poppins, Cabin } from "next/font/google";
import React from "react";
import { PageLayout } from "@/models/pageLayout";
import RootTheme from "@/components/theme/theme";

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
].join(" ");

interface PageLayoutProps extends PageLayout {}

export default function RootLayout({ children }: PageLayoutProps) {
  return (
    <html lang="en">
      <RootTheme>
        <body className={fonts + " pt-16 sm:pt-20 pb-4 "}>
          <DrawerAppBar />
          {children}
        </body>
      </RootTheme>
    </html>
  );
}
