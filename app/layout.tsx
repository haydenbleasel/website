import type { FC, ReactNode } from 'react';
import './globals.css';
import clsx from 'clsx';
import { TooltipProvider } from '@/components/tooltip';
import ThemeSwitcher from '@/components/themeSwitcher';
import { sans } from '@/lib/fonts';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body
      className={clsx(sans.variable, 'bg-white font-sans dark:bg-neutral-950')}
    >
      <TooltipProvider>
        {children}
        <ThemeSwitcher />
      </TooltipProvider>
    </body>
  </html>
);

export default RootLayout;
