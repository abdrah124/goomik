import DrawerAppBar from "@/components/AppBar";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Quicksand, Poppins, Cabin, Roboto } from "next/font/google";
import React from "react";
import { PageLayout } from "@/models/pageLayout";
import RootTheme from "@/components/theme/RootTheme";
import QueryProvider from "@/components/utils/QueryProvider";
import { ThemePalleteMode } from "@/components/ThemeToggler";
import { config } from "@/lib/config";

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
  title: "Gooscans",
  description: "read manhwa, manga, manhua, all genres, fast update here",
  viewport: "initial-scale=1, width=device-width",
  verification: { google: "mPTi6uZ_aDDAMsAsKdO5l1CJe98B29ReLAcxtWHm3_I" },
  openGraph: {
    title: "Gooscans",
    description: "Read free latest manhwa, manhua, manga.",
    url: `${config.baseWebUrl}`,
    siteName: "goscans",
    images: [
      {
        url: "./android-chrome-192x192.png",
        width: 100,
        height: 100,
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
            <Analytics />
          </body>
        </html>
      </ThemePalleteMode>
    </RootTheme>
  );
}
