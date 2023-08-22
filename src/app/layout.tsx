import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { PageLayout } from "@/models/pageLayout";
import { config } from "@/lib/config";
import RootContext from "@/context/RootContext";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Gooscans",
  description: "read manhwa, manga, manhua, all genres, fast update here",
  viewport: "initial-scale=1, width=device-width",
  verification: { google: "z9QEFO5sgneeoND4FrViJ0h-9IQQ9fZ6xIR8SN7kI0U" },

  openGraph: {
    title: "Gooscans",
    description: "Read free latest manhwa, manhua, manga.",
    url: `${config.baseWebUrl}`,
    siteName: "Gooscans",
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
  return (
    <RootContext>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XM3HPB28YR"
      ></Script>
      <Script id="gtag-config">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XM3HPB28YR');`}
      </Script>
      {children}
    </RootContext>
  );
}
