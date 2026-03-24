import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Serif as createSerif } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
const origin = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000";
const websiteUrl = `${protocol}://${origin}`;

const sans = localFont({
  display: "swap",
  src: [
    {
      path: "./soehne-buch.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./soehne-kraftig.woff2",
      style: "normal",
      weight: "500",
    },
  ],
  variable: "--font-sans",
});

const serif = createSerif({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

const title = "Software engineer and product designer | Hayden Bleasel";
const description =
  "I design and build software on the internet. I’m originally from Sydney, Australia and currently living in San Francisco, California.";

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title,
  },
  authors: [
    {
      name: "Hayden Bleasel",
      url: websiteUrl,
    },
  ],

  creator: "Hayden Bleasel",

  description,

  openGraph: {
    description,
    images: [
      {
        alt: "Hayden Bleasel",
        height: 630,
        url: new URL("/opengraph-image.png", websiteUrl).toString(),
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: "Hayden Bleasel",
    title,
    type: "website",
    url: websiteUrl,
  },

  title,

  twitter: {
    card: "summary_large_image",
    creatorId: "@haydenbleasel",
    description,
    images: [
      {
        alt: "Hayden Bleasel",
        height: 630,
        url: new URL("/opengraph-image.png", websiteUrl).toString(),
        width: 1200,
      },
    ],
    title,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body
      className={`${sans.variable} ${serif.variable} font-sans antialiased`}
    >
      <main className="relative z-10 mx-auto grid w-full max-w-2xl gap-16 sm:gap-24 px-4 py-16 sm:py-32">
        {children}
      </main>
      <Analytics />
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
