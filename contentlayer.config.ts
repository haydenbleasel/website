import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import {
  computeFields,
  remarkPlugins,
  rehypePlugins,
} from 'contentlayer-datapad';

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
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

export const Work = defineDocumentType(() => ({
  name: 'Work',
  filePathPattern: `work/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    role: {
      type: 'string',
      required: true,
    },
    company: {
      type: 'string',
      required: true,
    },
    link: {
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
    location: {
      type: 'string',
      required: true,
    },
  },
  computedFields: computeFields<'Work'>({}),
}));

export const App = defineDocumentType(() => ({
  name: 'App',
  filePathPattern: `app/**/*.mdx`,
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
  computedFields: computeFields<'App'>({}),
}));

const source = makeSource({
  contentDirPath: './content',
  documentTypes: [Blog, Work, App],
  mdx: {
    remarkPlugins: remarkPlugins(),
    rehypePlugins: rehypePlugins({
      theme: 'slack-dark',
    }),
  },
});

export default source;
