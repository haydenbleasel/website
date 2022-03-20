/* eslint-disable @typescript-eslint/explicit-member-accessibility, @typescript-eslint/explicit-module-boundary-types, class-methods-use-this */
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head />
        <body className="bg-white dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
