import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Image from "next/image";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${soehneBuch.className} antialiased`}>
        <div className="absolute top-0 right-0 left-0 h-[50vh] max-h-[600px] w-full">
          <Image
            alt="Logo"
            className="size-full object-cover"
            height={600}
            src={Background}
            width={1440}
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-stone-50" />
        </div>
        <main className="relative z-10 mx-auto w-full max-w-[540px] py-32">
          <div className="mb-12 size-8 rounded-full bg-stone-950" />
          {children}
        </main>
      </body>
    </html>
  );
}
