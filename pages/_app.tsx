import type { FC } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { PrismicProvider } from '@prismicio/react';
import { SocialProfileJsonLd } from 'next-seo';
import { client, linkResolver } from '../utils/prismic';
import '../styles/globals.css';
import '../styles/dev.css';
import CommandBar from '../components/commandbar';
import Menu from '../components/menu';
import ExternalLinkComponent from '../components/externalLink';
import InternalLinkComponent from '../components/internalLink';
import useAnalytics from '../hooks/useAnalytics';
import richTextComponents from '../components/richTextComponents';
import { social } from '../utils/social';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useAnalytics();

  return (
    <CommandBar>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
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
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={InternalLinkComponent}
        externalLinkComponent={ExternalLinkComponent}
        client={client}
        richTextComponents={richTextComponents}
      >
        <Component {...pageProps} />
      </PrismicProvider>
      <Menu />
      <Toaster
        containerClassName="print:hidden"
        toastOptions={{
          duration: 5000,
          position: 'bottom-right',
        }}
      />
    </CommandBar>
  );
};

export default App;
