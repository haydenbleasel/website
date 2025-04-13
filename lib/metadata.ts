import merge from 'deepmerge';
import type { Metadata } from 'next';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
  ogText?: string;
  image?: string;
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
  ogText,
  image,
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
      images: [
        {
          url: image ?? `/og?title=${encodeURIComponent(ogText ?? '')}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    publisher,
    twitter: {
      title: parsedTitle,
      description,
      creatorId: twitterHandle,
      card: 'summary_large_image',
      creator: twitterHandle,
      images: [
        {
          url: image ?? `/og?title=${encodeURIComponent(ogText ?? '')}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  return metadata;
};
