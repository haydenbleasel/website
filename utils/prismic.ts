import * as prismic from '@prismicio/client';
import type { LinkResolverFunction } from '@prismicio/helpers';
import { enableAutoPreviews } from '@prismicio/next';
import type {
  FilledLinkToWebField,
  FilledLinkToDocumentField,
  LinkField,
  FilledLinkToMediaField,
} from '@prismicio/types';
import type { PreviewData } from 'next';
import type { FetchLike } from '@prismicio/client';

export const linkResolver: LinkResolverFunction = (document) => {
  if (!document.uid) {
    return '/';
  }

  switch (document.type) {
    case 'home':
      return '/';
    case 'project':
      return `/projects/${document.uid}`;
    case 'case-study':
      return `/blog/${document.uid}`;
    case 'work-post':
      return `/work/${document.uid}`;
    default:
      return `/${document.uid}`;
  }
};

export const docResolver = (link: LinkField): string => {
  switch (link.link_type) {
    case 'Document':
      return linkResolver(link as FilledLinkToDocumentField);
    case 'Web':
    case 'Media':
      return (link as FilledLinkToWebField | FilledLinkToMediaField).url;
    default:
      return '';
  }
};

export const createClient = (config = {}): prismic.Client => {
  const client = prismic.createClient(
    process.env.NEXT_PUBLIC_PRISMIC_ENDPOINT ?? 'loading',
    {
      fetch: fetch as FetchLike,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN ?? '',
      ...config,
    }
  );

  enableAutoPreviews({
    client,
    previewData: (config as { previewData: PreviewData }).previewData,
    req: (config as { req: prismic.HttpRequestLike | undefined }).req,
  });

  return client;
};

export const getPage = async (
  config: Record<string, unknown>,
  uid: string,
  type?: string
): Promise<unknown> => {
  try {
    const page = await createClient(config).getByUID(type ?? uid, uid);

    return page;
  } catch (error) {
    return null;
  }
};

export const getPages = async (type: string): Promise<unknown> => {
  try {
    const pages = await createClient().getAllByType(type);

    return pages;
  } catch (error) {
    return null;
  }
};
