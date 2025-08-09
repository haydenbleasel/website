import merge from 'deepmerge';
import type { Metadata } from 'next';
import { baseUrl } from './url';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
};

const applicationName = 'Hayden Bleasel';
const author: Metadata['authors'] = {
  name: 'Hayden Bleasel',
  url: 'https://haydenbleasel.com/',
};
const publisher = 'Hayden Bleasel';
const twitterHandle = '@haydenbleasel';

export const createMetadata = ({
  title,
  description,
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title} | ${applicationName}`;

  const defaultMetadata: Metadata = {
    title: parsedTitle,
    description,
    applicationName,
    authors: [author],
    creator: author.name,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description,
      type: 'website',
      siteName: applicationName,
      locale: 'en_US',
    },
    publisher,
    twitter: {
      title: parsedTitle,
      description,
      creatorId: twitterHandle,
      card: 'summary_large_image',
      creator: twitterHandle,
    },
    alternates: {
      types: {
        'application/rss+xml': new URL('/blog.xml', baseUrl).toString(),
      },
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  return metadata;
};
