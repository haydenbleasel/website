import { Mdx } from '@/components/mdx';
import { createMetadata } from '@/lib/metadata';
import { allPages } from 'content-collections';
import type { Metadata } from 'next';

const page = allPages.find((page) => page._meta.fileName === 'projects.mdx');

if (!page) {
  throw new Error('Projects page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/og?title=${page.title}&description=${page.description}`,
});

const ProjectsPage = () => <Mdx code={page.body} />;

export default ProjectsPage;
