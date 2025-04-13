import { mono, sans } from '@/lib/fonts';
import './globals.css';
import { JsonLd } from '@/components/json-ld';
import { Navigation } from '@/components/navigation';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { WindowsEmojiPolyfill } from '@/components/windows-emoji-polyfill';
import { cn } from '@/lib/utils';
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
        'bg-background px-4 font-sans text-foreground-light leading-relaxed antialiased'
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navigation />
        <div className="mx-auto grid max-w-2xl gap-12 border-x border-dotted px-8 pt-32 pb-16">
          {children}
        </div>
        <Toaster />
        <ThemeSwitcher />
        <WindowsEmojiPolyfill />
        <JsonLd />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
