import * as prismic from '@prismicio/client';
import type { LinkResolverFunction } from '@prismicio/helpers';
import type {
  FilledLinkToWebField,
  FilledLinkToDocumentField,
  LinkField,
} from '@prismicio/types';

export const linkResolver: LinkResolverFunction = (document) => {
  if (!document.uid) {
    return '/';
  }

  const routes: Record<string, string> = {
    home: '/',
    project: `/projects/${document.uid}`,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'case-study': `/blog/${document.uid}`,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'work-post': `/blog/${document.uid}`,
  };

  return routes[document.type] || `/${document.uid}`;
};

export const docResolver = (link: LinkField): string => {
  if (link.link_type === 'Document') {
    return linkResolver(link as FilledLinkToDocumentField);
  }

  if (link.link_type === 'Any') {
    return '';
  }

  return (link as FilledLinkToWebField).url;
};

export const client = prismic.createClient(
  process.env.PRISMIC_ENDPOINT ?? 'loading',
  {
    fetch,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN ?? '',
  }
);

export const getPage = async (uid: string, type?: string): Promise<unknown> => {
  try {
    const page = await client.getByUID(type ?? uid, uid);

    return page;
  } catch (error) {
    return null;
  }
};

export const getPages = async (type: string): Promise<unknown> => {
  try {
    const pages = await client.getAllByType(type);

    return pages;
  } catch (error) {
    return null;
  }
};
