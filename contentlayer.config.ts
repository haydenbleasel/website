// eslint-disable-next-line import/no-nodejs-modules
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import {
  computeFields,
  remarkPlugins,
  rehypePlugins,
} from 'contentlayer-datapad';

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/*.mdx`,
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
    remarkPlugins: remarkPlugins(),
    rehypePlugins: rehypePlugins({
      theme: 'one-dark-pro',
    }),
  },
});

export default source;
