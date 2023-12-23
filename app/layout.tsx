import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';
import { Navbar } from '../components/navbar';
import type { FC, ReactNode } from 'react';

type RootLayoutProps = {
  readonly children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html
    lang="en"
    className={cn(
      GeistSans.variable,
      GeistMono.variable,
      'antialiased touch-manipulation font-sans'
    )}
  >
    <body className="bg-zinc-50 dark:bg-zinc-900">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Navbar />
          <div className="lg:ml-60">{children}</div>
        </TooltipProvider>
      </ThemeProvider>
      <Toaster />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
