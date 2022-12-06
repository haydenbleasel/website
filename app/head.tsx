import type { FC } from 'react';

const Head: FC = () => (
  <>
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
  </>
);

export default Head;
