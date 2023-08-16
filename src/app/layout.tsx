import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { PageLayout } from "@/models/pageLayout";
import { config } from "@/lib/config";
import RootContext from "@/context/RootContext";

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

interface PageLayoutProps extends PageLayout {}

export default async function RootLayout({ children }: PageLayoutProps) {
  return <RootContext>{children}</RootContext>;
}
