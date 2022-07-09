/* eslint-disable @typescript-eslint/explicit-member-accessibility, @typescript-eslint/explicit-module-boundary-types, class-methods-use-this */
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@1,300;1,400&amp;display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="mt-12 overflow-x-hidden bg-white font-text font-normal tracking-normal text-red-400 antialiased dark:bg-gray-900 print:mt-0 sm:mt-48">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
