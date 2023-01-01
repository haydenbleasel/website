import { NextSeo } from 'next-seo';
import type { MetaTag } from 'next-seo/lib/types';
import type { FC } from 'react';

const name = 'Hayden Bleasel';
const title = 'Product designer and frontend engineer';
const description =
  'Blurring the line between real and virtual at Corellium and caling planetary reforestation with Neutral.';
const url = process.env.NEXT_PUBLIC_SITE_URL;

const Head: FC = () => (
  <NextSeo
    useAppDir
    titleTemplate={`%s — ${name}`}
    canonical={url}
    openGraph={{
      title,
      description,
      url,
      site_name: name,
      type: 'profile',
      profile: {
        firstName: 'Hayden',
        lastName: 'Bleasel',
        username: 'haydenbleasel',
        gender: 'male',
      },
      images: [
        {
          url: new URL('/cover.jpg', url).toString(),
          width: 1200,
          height: 630,
          alt: 'Hayden Bleasel',
        },
      ],
    }}
    twitter={{
      handle: '@haydenbleasel',
      site: '@haydenbleasel',
      cardType: 'summary_large_image',
    }}
    additionalLinkTags={[
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#F5F5F9',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ]}
    additionalMetaTags={[
      {
        charSet: 'utf-8',
      } as unknown as MetaTag,
      {
        name: 'viewport',
        content:
          'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
      },
      {
        name: 'application-name',
        content: 'Hayden Bleasel',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Hayden Bleasel',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'msapplication-TileColor',
        content: '#F5F5F9',
      },
      {
        name: 'msapplication-tap-highlight',
        content: 'no',
      },
      {
        name: 'theme-color',
        content: '#F5F5F9',
      },
    ]}
  />
);

export default Head;
