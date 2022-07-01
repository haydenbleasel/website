import dynamic from 'next/dynamic';
import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicLink } from '@prismicio/react';
import Image from 'next/future/image';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import type { TwitterTweetEmbedProps } from 'react-twitter-embed/dist/components/TwitterTweetEmbed';
import resolveConfig from 'tailwindcss/resolveConfig';
import type { TailwindConfig } from 'tailwindcss/tailwind-config';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';
import { docResolver } from '../utils/prismic';
import tailwindConfig from '../tailwind.config';
import Video from './video';

const fullConfig = resolveConfig(tailwindConfig as TailwindConfig);

const richTextComponents: JSXMapSerializer = {
  paragraph: ({ children, key }) => (
    <p
      key={key}
      className="mb-4 text-md font-normal text-gray-900 dark:text-white print:text-sm"
    >
      {children}
    </p>
  ),
  em: ({ children, key }) => (
    <em
      key={key}
      className="font-serif text-[17px] font-medium text-gray-900 dark:text-white"
    >
      {children}
    </em>
  ),
  strong: ({ children, key }) => (
    <strong key={key} className="font-semibold">
      {children}
    </strong>
  ),
  image: ({ key, node }) => (
    <Image
      key={key}
      src={node.url}
      alt={node.alt ?? ''}
      width={640}
      height={640 * (node.dimensions.height / node.dimensions.width)}
      className="my-8 flex w-full overflow-hidden rounded-sm"
      quality={100}
    />
  ),
  hyperlink: ({ children, node, key }) => (
    <span className="inline border-b border-gray-900 hover:border-gray-600 dark:border-white dark:hover:border-gray-300">
      <PrismicLink key={key} href={docResolver(node.data)}>
        {children}
      </PrismicLink>
    </span>
  ),
  heading1: ({ children, key }) => (
    <h1
      key={key}
      className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white print:text-lg"
    >
      {children}
    </h1>
  ),
  heading2: ({ children, key }) => (
    <h2
      key={key}
      className="mt-8 mb-4 text-sm font-semibold text-gray-900 dark:text-white print:text-xs sm:text-lg"
    >
      {children}
    </h2>
  ),
  heading3: ({ children, key }) => (
    <h3
      key={key}
      className="mt-8 mb-4 text-xs font-semibold text-gray-900 dark:text-white sm:text-md"
    >
      {children}
    </h3>
  ),
  heading4: ({ children, key }) => (
    <h4
      key={key}
      className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white print:text-lg sm:text-sm"
    >
      {children}
    </h4>
  ),
  heading5: ({ children, key }) => (
    <h5
      key={key}
      className="mt-8 mb-4 text-lg font-semibold text-gray-900 dark:text-white print:text-md sm:text-xs"
    >
      {children}
    </h5>
  ),
  heading6: ({ children, key }) => (
    <h6
      key={key}
      className="mt-8 mb-4 text-md font-semibold text-gray-900 dark:text-white print:text-sm sm:text-xl"
    >
      {children}
    </h6>
  ),
  list: ({ children, key }) => (
    <ul key={key} className="mb-4 list-inside list-disc pl-0">
      {children}
    </ul>
  ),
  oList: ({ children, key }) => (
    <ul key={key} className="mb-4 list-inside list-decimal pl-0">
      {children}
    </ul>
  ),
  listItem: ({ children, key }) => (
    <li
      key={key}
      className="pl-8 -indent-[1.4rem] text-md text-gray-900 dark:text-white print:text-sm"
    >
      {children}
    </li>
  ),
  oListItem: ({ children, key }) => (
    <li
      key={key}
      className="pl-8 -indent-[1.4rem] text-md text-gray-900 dark:text-white print:text-sm"
    >
      {children}
    </li>
  ),
  embed: ({ node, key }) => {
    if (!node.oembed.html) {
      return undefined;
    }

    if (node.oembed.provider_name === 'Twitter') {
      const tweetId = (node.oembed.url as string).split('/').pop();

      if (!tweetId) {
        return undefined;
      }

      const TwitterTweetEmbed = dynamic<TwitterTweetEmbedProps>(async () =>
        import(
          /* webpackChunkName: "react-twitter-embed" */
          'react-twitter-embed'
        ).then((mod) => mod.TwitterTweetEmbed)
      );

      return (
        <div className="mx-auto my-8 max-w-[550px]">
          <TwitterTweetEmbed tweetId={tweetId} />
        </div>
      );
    }

    if (node.oembed.type === 'video') {
      return <Video data={node.oembed} />;
    }

    return (
      <div
        key={key}
        className="mb-4"
        // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
        dangerouslySetInnerHTML={{ __html: node.oembed.html }}
      />
    );
  },
  preformatted: ({ node, key }) => {
    const { gray } = fullConfig.theme.colors as unknown as DefaultColors;
    const SyntaxHighlighter = dynamic(
      async () =>
        import(
          /* webpackChunkName: "react-syntax-highlighter" */
          'react-syntax-highlighter'
        )
    );

    return (
      <div className="grid w-full font-mono font-medium">
        <SyntaxHighlighter
          key={key}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          style={dracula}
          customStyle={{
            padding: '1rem',
            borderRadius: '0.25rem',
            backgroundColor: gray[800],
          }}
          showLineNumbers
          lineNumberStyle={{
            color: gray[400],
          }}
        >
          {node.text}
        </SyntaxHighlighter>
      </div>
    );
  },
};

export default richTextComponents;
