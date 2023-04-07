import type { FC, ReactNode } from 'react';
import './globals.css';
import clsx from 'clsx';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body className={clsx('font-sans')}>{children}</body>
  </html>
);

export default RootLayout;
