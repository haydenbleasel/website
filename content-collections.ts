import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import {
  type RehypeCodeOptions,
  rehypeCode,
  remarkGfm,
  remarkHeading,
} from 'fumadocs-core/mdx-plugins';
import readingTime from 'reading-time';

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-black',
  },
};

const blogs = defineCollection({
  name: 'blog',
  directory: 'blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string().optional(),
  }),
  transform: async (page, context) => {
    const body = await compileMDX(context, page, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeCode, rehypeCodeOptions], remarkHeading],
    });

    return {
      ...page,
      date: new Date(page.date),
      body,
      slug: page._meta.path,
      readingTime: readingTime(page.content).text,
    };
  },
});

export default defineConfig({
  collections: [blogs],
});
