import { Mdx } from '@/components/mdx';
import { createMetadata } from '@/lib/metadata';
import { allPages } from 'content-collections';
import type { Metadata } from 'next';

const page = allPages.find((page) => page._meta.fileName === 'work.mdx');

if (!page) {
  throw new Error('Work page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/og?title=${page.title}&description=${page.description}`,
});

const WorkPage = () => <Mdx code={page.body} />;

export default WorkPage;
