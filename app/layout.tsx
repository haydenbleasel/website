import { mono, sans } from '@/lib/fonts';
import './globals.css';
import { Navigation } from '@/components';
import { JsonLd } from '@/components/json-ld';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { WindowsEmojiPolyfill } from '@/components/windows-emoji-polyfill';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { Toaster } from 'sonner';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning className="scroll-smooth">
    <body
      className={cn(
        sans.variable,
        mono.variable,
        'bg-background px-4 font-sans text-foreground-light leading-relaxed antialiased'
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="mx-auto grid max-w-2xl gap-12">
          <Navigation />
          <div className="grid gap-4 pb-16 sm:px-8">
            <ViewTransition>{children}</ViewTransition>
          </div>
        </div>
        <Toaster />
        <ThemeSwitcher />
        <WindowsEmojiPolyfill />
        <JsonLd />
        <Analytics />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
