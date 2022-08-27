import dynamic from 'next/dynamic';
import type { JSXMapSerializer } from '@prismicio/react';
import Image from 'next/future/image';
import type { TwitterTweetEmbedProps } from 'react-twitter-embed/dist/components/TwitterTweetEmbed';
import resolveConfig from 'tailwindcss/resolveConfig';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';
import type { CSSProperties, FC } from 'react';
import { Suspense, useState, useEffect } from 'react';
import type { RTEmbedNode, RTPreformattedNode } from '@prismicio/types';
import type { RequiredConfig } from 'tailwindcss/types/config';
import tailwindConfig from '../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig as RequiredConfig);

type PreformattedProps = {
  node: RTPreformattedNode;
  key: string;
};

const Preformatted: FC<PreformattedProps> = ({ node, key }) => {
  const { neutral } = fullConfig.theme?.colors as unknown as DefaultColors;
  const SyntaxHighlighter = dynamic(async () => {
    const { Light } = await import(
      /* webpackChunkName: "react-syntax-highlighter" */
      'react-syntax-highlighter'
    );
    const javascript = await import(
      /* webpackChunkName: "react-syntax-highlighter-javascript" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
    );
    const typescript = await import(
      /* webpackChunkName: "react-syntax-highlighter-typescript" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/typescript'
    );
    const bash = await import(
      /* webpackChunkName: "react-syntax-highlighter-bash" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/bash'
    );
    const xml = await import(
      /* webpackChunkName: "react-syntax-highlighter-xml" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/xml'
    );
    const http = await import(
      /* webpackChunkName: "react-syntax-highlighter-http" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/http'
    );
    const json = await import(
      /* webpackChunkName: "react-syntax-highlighter-json" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/json'
    );
    const markdown = await import(
      /* webpackChunkName: "react-syntax-highlighter-markdown" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/markdown'
    );
    const plaintext = await import(
      /* webpackChunkName: "react-syntax-highlighter-plaintext" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/plaintext'
    );
    const shell = await import(
      /* webpackChunkName: "react-syntax-highlighter-shell" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/shell'
    );
    const yaml = await import(
      /* webpackChunkName: "react-syntax-highlighter-yaml" */
      'react-syntax-highlighter/dist/cjs/languages/hljs/yaml'
    );

    Light.registerLanguage('javascript', javascript);
    Light.registerLanguage('typescript', typescript);
    Light.registerLanguage('bash', bash);
    Light.registerLanguage('xml', xml);
    Light.registerLanguage('http', http);
    Light.registerLanguage('json', json);
    Light.registerLanguage('markdown', markdown);
    Light.registerLanguage('plaintext', plaintext);
    Light.registerLanguage('shell', shell);
    Light.registerLanguage('yml', yaml);

    return Light;
  });

  const [theme, setTheme] = useState<Record<string, CSSProperties> | undefined>(
    undefined
  );

  useEffect(() => {
    const loadTheme = async () => {
      const dracula = (
        await import(
          /* webpackChunkName: "react-syntax-highlighter-dracula" */
          'react-syntax-highlighter/dist/cjs/styles/hljs/dracula'
        )
      ).default;

      setTheme(dracula);
    };

    if (!theme) {
      // eslint-disable-next-line no-console
      loadTheme().catch(console.warn);
    }
  }, [theme]);

  return (
    <div className="grid w-full font-mono font-medium">
      <Suspense fallback={node.text}>
        <SyntaxHighlighter
          key={key}
          style={theme}
          customStyle={{
            padding: '1rem',
            borderRadius: '0.25rem',
            backgroundColor: neutral[800],
          }}
          showLineNumbers
          lineNumberStyle={{
            color: neutral[400],
          }}
        >
          {node.text}
        </SyntaxHighlighter>
      </Suspense>
    </div>
  );
};

const Fallback: FC<{ node: RTEmbedNode }> = ({ node }) => (
  <div
    className="mb-4"
    // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
    dangerouslySetInnerHTML={{ __html: node.oembed.html ?? '' }}
  />
);

const richTextComponents: JSXMapSerializer = {
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
  embed: ({ node, key }) => {
    if (!node.oembed.html) {
      return undefined;
    }

    if (node.oembed.provider_name === 'Twitter') {
      const tweetId = (node.oembed.url as string).split('/').pop();
      const TwitterTweetEmbed = dynamic<TwitterTweetEmbedProps>(async () =>
        import(
          /* webpackChunkName: "react-twitter-embed" */
          'react-twitter-embed'
        ).then((mod) => mod.TwitterTweetEmbed)
      );

      if (!tweetId) {
        return undefined;
      }

      return (
        <div className="mx-auto my-8 max-w-[550px]">
          <Suspense fallback={<Fallback key={key} node={node} />}>
            <TwitterTweetEmbed tweetId={tweetId} />
          </Suspense>
        </div>
      );
    }

    if (node.oembed.type === 'video') {
      const Video = dynamic(
        async () =>
          import(
            /* webpackChunkName: "video" */
            './video'
          )
      );

      return (
        <Suspense fallback={<Fallback key={key} node={node} />}>
          <Video data={node.oembed} />
        </Suspense>
      );
    }

    return <Fallback key={key} node={node} />;
  },
  preformatted: Preformatted,
};

export default richTextComponents;
