import type { FC } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import type { LinkProps } from '@prismicio/react';
import { PrismicProvider } from '@prismicio/react';
import { SocialProfileJsonLd } from 'next-seo';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { PrismicPreview } from '@prismicio/next';
import Link from 'next/link';
import { KBarProvider } from 'kbar';
import { createClient, linkResolver } from '../utils/prismic';
import '../styles/globals.css';
import ExternalLinkComponent from '../components/externalLink';
import richTextComponents from '../components/richTextComponents';
import { social } from '../utils/social';

const InternalLinkComponent = (props: LinkProps) => <Link {...props} />;

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />

      <meta name="application-name" content="Hayden Bleasel" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Hayden Bleasel" />

      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#F5F5F9" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#F5F5F9" />
      <link rel="manifest" href="/manifest.json" />

      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#F5F5F9" />
    </Head>
    <SocialProfileJsonLd
      type="Person"
      name="Hayden Bleasel"
      url={process.env.NEXT_PUBLIC_SITE_URL ?? ''}
      sameAs={Object.values(social).map(({ url }) => url)}
    />
    <TooltipProvider delayDuration={0}>
      <KBarProvider>
        <PrismicProvider
          linkResolver={linkResolver}
          internalLinkComponent={InternalLinkComponent}
          externalLinkComponent={ExternalLinkComponent}
          client={createClient()}
          richTextComponents={richTextComponents}
        >
          <PrismicPreview
            repositoryName={process.env.NEXT_PUBLIC_PRISMIC_ENDPOINT ?? ''}
          >
            <Component {...pageProps} />
          </PrismicPreview>
        </PrismicProvider>
      </KBarProvider>
    </TooltipProvider>
    <Toaster
      containerClassName="print:hidden"
      toastOptions={{
        duration: 5000,
        position: 'bottom-right',
        className:
          '!bg-neutral-900/90 !backdrop-blur-md !text-white !rounded-sm',
      }}
    />
  </>
);

export default App;
