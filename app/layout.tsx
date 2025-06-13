import { mono, sans } from '@/lib/fonts';
import './globals.css';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { Navigation } from '@/components/navigation';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { WindowsEmojiPolyfill } from '@/components/windows-emoji-polyfill';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
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
        'bg-background font-sans text-foreground-light leading-relaxed antialiased'
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="mx-auto grid max-w-2xl gap-12 px-4 py-8 pb-12 sm:px-8">
          <Navigation />
          {children}
          <Footer />
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
