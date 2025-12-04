import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import Image from "next/image";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import Background from "./background.jpg";

const soehneBuch = localFont({
  src: "./soehne-buch.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Software engineer and product designer | Hayden Bleasel",
  description:
    "I design and build software on the internet. I’m originally from Sydney, Australia and currently living in San Francisco, California 🇺🇸.",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body className={`${soehneBuch.className} antialiased`}>
      <div className="absolute top-0 right-0 left-0 h-[50vh] max-h-[600px] w-full">
        <Image
          alt="Logo"
          className="size-full object-cover dark:opacity-10"
          height={600}
          src={Background}
          width={1440}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" />
      </div>
      <main className="relative z-10 mx-auto w-full max-w-xl px-4 py-16 sm:py-32">
        <Image
          alt="Hayden Bleasel"
          className="mb-12 size-8 rounded-full"
          height={32}
          src="https://github.com/haydenbleasel.png"
          width={32}
        />
        {children}
      </main>
      <Analytics />
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
