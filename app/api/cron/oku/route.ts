import { basehub } from '@/lib/basehub';
import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';
import ky from 'ky';
import Parser from 'rss-parser';

type Collection = {
  items: {
    creator: string;
    title: string;
    link: string;
    pubDate: string;
    enclosure?: {
      length: string;
      type: string;
      url: string;
    };
    'dc:creator': string;
    content: string;
    contentSnippet: string;
    guid: string;
    isoDate: string;
  }[];
  feedUrl: string;
  paginationLinks: {
    self: string;
  };
  title: string;
  description: string;
  link: string;
  language: string;
  lastBuildDate: string;
};

type OkuCollectionProperties = {
  id: string;
  title: string;
  image: string | undefined;
  author: string;
  link: string;
}[];

export type OkuProperties = {
  backlog: OkuCollectionProperties;
  reading: OkuCollectionProperties;
  completed: OkuCollectionProperties;
};

const getCollection = async (id: string) => {
  const url = `https://oku.club/rss/collection/${id}`;
  const parser = new Parser();
  const response = await ky.get(url).text();
  const feed = await parser.parseString(response);

  return feed as Collection;
};

const getCollectionIds = async () => {
  const { about } = await basehub.query({
    about: {
      books: {
        backlogId: true,
        readingId: true,
        completedId: true,
      },
    },
  });

  return about.books;
};

const parseTitle = (str: string) => {
  const [title] = str.split(':');

  return title;
};

export const GET = async (): Promise<Response> => {
  try {
    const collectionIds = await getCollectionIds();
    const [backlog, reading, completed] = await Promise.all([
      getCollection(collectionIds.backlogId),
      getCollection(collectionIds.readingId),
      getCollection(collectionIds.completedId),
    ]);

    const props: OkuProperties = {
      backlog: backlog.items.map((book) => ({
        id: book.guid,
        title: parseTitle(book.title),
        image: book.enclosure?.url,
        author: book.creator,
        link: book.link,
      })),
      reading: reading.items.map((book) => ({
        id: book.guid,
        title: parseTitle(book.title),
        image: book.enclosure?.url,
        author: book.creator,
        link: book.link,
      })),
      completed: completed.items.map((book) => ({
        id: book.guid,
        title: parseTitle(book.title),
        image: book.enclosure?.url,
        author: book.creator,
        link: book.link,
      })),
    };

    await updateEdgeConfig('oku', props);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
