import { Providers } from '@/app/providers';
import { Layout } from '@/components/layout';
import '@/styles/tailwind.css';
import { Analytics } from '@vercel/analytics/next';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import 'react-medium-image-zoom/dist/styles.css';
import clsx from 'clsx';
import {
  Geist_Mono as createMono,
  Geist as createSans,
} from 'next/font/google';

type RootLayoutProps = {
  children: ReactNode;
};

const sans = createSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: 'variable',
  display: 'swap',
});

const mono = createMono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: 'variable',
});

const RootLayout = ({ children }: RootLayoutProps) => (
  <html className="h-full antialiased" lang="en" suppressHydrationWarning>
    <body
      className={clsx(
        'flex h-full bg-zinc-50 font-sans antialiased dark:bg-black',
        sans.variable,
        mono.variable
      )}
    >
      <Providers>
        <div className="flex w-full">
          <Layout>{children}</Layout>
        </div>
      </Providers>
      <Toaster />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
