import type { FC } from "react";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { load, trackPageview } from "fathom-client";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { events } = useRouter();

  useEffect(() => {
    load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID ?? '', {
      includedDomains: [new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '').hostname],
      url: process.env.NEXT_PUBLIC_ANALYTICS_URL,
    });

    const onRouteChangeComplete = () => trackPageview();

    events.on("routeChangeComplete", onRouteChangeComplete);

    onRouteChangeComplete();

    return () => {
      events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [events]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

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
      <Component {...pageProps} />
      <Toaster toastOptions={{
        duration: 5000,
        position: 'bottom-right',
      }} />
    </>
  );
};

export default App;