import './globals.css';
import type { ReactNode } from 'react';
import { CallToAction } from './components/cta';
import { Footer } from './components/footer';
import { Header } from './components/header';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body className="antialiased">
      <Header />
      <main>{children}</main>
      <CallToAction />
      <Footer />
    </body>
  </html>
);

export default RootLayout;
