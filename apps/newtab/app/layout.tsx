import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { fonts } from "@haydenbleasel/design-system/fonts";

export const metadata: Metadata = {
  description: "A personal dashboard.",
  robots: {
    follow: false,
    index: false,
  },
  title: "Newtab",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body className={fonts}>{children}</body>
  </html>
);

export default RootLayout;
