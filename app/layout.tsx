import './globals.css';
import { ThemeProvider } from '@/providers/theme';
import type { ReactNode } from 'react';
import { CallToAction } from './components/cta';
import { Footer } from './components/footer';
import { Header } from './components/header';

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
    <body className="bg-secondary font-sans antialiased dark:bg-background">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <main className="container mx-auto divide-y border">
          {children}
          <CallToAction />
        </main>
        <Footer />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
