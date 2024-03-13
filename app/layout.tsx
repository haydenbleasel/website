import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';
import type { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        'bg-white dark:bg-neutral-950 font-sans'
      )}
    >
      {children}
    </body>
  </html>
);

export default RootLayout;
