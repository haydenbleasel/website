import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
};

export const WorkPost = defineDocumentType(() => ({
  name: 'WorkPost',
  filePathPattern: `work/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    company: {
      type: 'string',
      required: true,
    },
    role: {
      type: 'string',
      required: true,
    },
    startYear: {
      type: 'number',
      required: true,
    },
    endYear: {
      type: 'number',
      required: false,
    },
    description: {
      type: 'string',
      required: true,
    },
    location: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: false,
    },
    video: {
      type: 'string',
      required: false,
    },
  },
  computedFields,
}));

export const CaseStudy = defineDocumentType(() => ({
  name: 'CaseStudy',
  filePathPattern: `case-studies/**/*.mdx`,
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
    video: {
      type: 'string',
      required: false,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [WorkPost, CaseStudy],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeAccessibleEmojis,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push(
              'bg-zinc-700 border-l-2 border-teal-500'
            );
          },
          onVisitHighlightedWord(node) {
            node.properties.className = 'bg-zinc-700 rounded p-1';
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
});
