import './globals.css';
import { CallToAction } from '@/components/cta';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/theme';
import type { ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
      />
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/css?f%5B%5D=jet-brains-mono@400&amp;display=swap"
      />
    </head>
    <body className="bg-backdrop font-sans antialiased">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <main className="divide-y sm:border-b">
          {children}
          <CallToAction />
        </main>
        <Footer />
      </ThemeProvider>
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
