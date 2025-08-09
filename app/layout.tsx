import { Providers } from '@/app/providers';
import { Layout } from '@/components/layout';
import '@/styles/tailwind.css';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html className="h-full antialiased" lang="en" suppressHydrationWarning>
    <body className="flex h-full bg-zinc-50 dark:bg-black">
      <Providers>
        <div className="flex w-full">
          <Layout>{children}</Layout>
        </div>
      </Providers>
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
