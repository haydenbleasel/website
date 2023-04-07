import type { FC, ReactNode } from 'react';
import './globals.css';
import clsx from 'clsx';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body className={clsx('font-sans')}>{children}</body>
  </html>
);

export default RootLayout;
