import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import type { ComputedFields } from 'contentlayer2/source-files';
import { extractTocHeadings } from 'pliny/mdx-plugins/remark-toc-headings.js';
import readingTime from 'reading-time';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { Options as RehypeAutoLinkHeadingsOptions } from 'rehype-autolink-headings';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrettyCode from 'rehype-pretty-code';
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { sqip } from 'sqip';
import moonlightTheme from './public/moonlight-ii.json' with { type: 'json' };

export const computeFields = <T extends string>({
  openGraphEndpoint = '/api/og',
  imagesFolder = './public',
}: {
  openGraphEndpoint?: string;
  imagesFolder?: string;
}): ComputedFields<T> => ({
  slug: {
    type: 'string',
    description: 'The slug of the document, used in the URL',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    description: 'The slug as a path segment',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  readingTime: {
    type: 'string',
    description: 'The estimated time to read the document, in minutes',
    resolve: (doc) => readingTime(doc.body.raw).text,
  },
  toc: {
    type: 'list',
    description: 'The table of contents of the document',
    resolve: async (doc) => extractTocHeadings(doc.body.raw),
  },
  image: {
    type: 'string',
    description: 'The image of the document',
    resolve: (doc) => {
      if (typeof doc.image === 'string') {
        return doc.image;
      }

      const searchParams = new URLSearchParams();

      if (typeof doc.title === 'string') {
        searchParams.set('title', doc.title);
      }

      if (typeof doc.description === 'string') {
        searchParams.set('description', doc.description);
      }

      return `${openGraphEndpoint}?${searchParams.toString()}`;
    },
  },
  imageBlur: {
    type: 'string',
    description: 'The image data of the document',
    resolve: async (doc) => {
      if (typeof doc.image !== 'string') {
        return '';
      }

      const folderBase = imagesFolder.endsWith('/')
        ? imagesFolder.slice(0, -1)
        : imagesFolder;

      const blur = await sqip({
        input: `${folderBase}${doc.image}`,
        plugins: [
          'sqip-plugin-primitive',
          'sqip-plugin-svgo',
          'sqip-plugin-data-uri',
        ],
      });

      const result = Array.isArray(blur) ? blur[0] : blur;

      return result.metadata.dataURIBase64;
    },
  },
});

const rehypePrettyCodeOptions: PrettyCodeOptions = {
  theme: moonlightTheme as never,
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
};

const rehypeAutolinkHeadingsOptions: RehypeAutoLinkHeadingsOptions = {
  properties: {
    className: [
      'relative',
      'lg:before:content-["#"]',
      'before:block',
      'before:absolute',
      'before:left-[-1.5rem]',
      'before:text-neutral-500',
      'focus:outline-none',
      'focus:before:text-neutral-600',
      'before:transition-colors',
    ],
    ariaLabel: 'Link to section',
  },
};

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    image: {
      type: 'string',
      required: false,
    },
  },
  computedFields: computeFields<'Blog'>({}),
}));

const source = makeSource({
  contentDirPath: './content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeAccessibleEmojis,
      rehypeSlug,
      [rehypePrettyCode as never, rehypePrettyCodeOptions],
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      rehypePresetMinify as never,
    ],
  },
});

export default source;
