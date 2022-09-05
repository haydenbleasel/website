import { Html, Head, Main, NextScript } from 'next/document';
import type { FC } from 'react';

const Document: FC = () => (
  <Html lang="en" className="scroll-smooth">
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@1,300;1,400&amp;display=swap"
        rel="stylesheet"
      />
    </Head>
    <body className="overflow-x-hidden bg-neutral-100 font-text font-normal antialiased dark:bg-neutral-900">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
