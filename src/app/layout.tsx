import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Script from 'next/script';

import "./globals.css";
import React from "react";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://mksg.lu"),
  title: `${RESUME_DATA.name} • ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
      {
        url: "/favicon/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: {
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  manifest: "/favicon/site.webmanifest",
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NW0ZXNL54H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NW0ZXNL54H');
          `}
        </Script>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
