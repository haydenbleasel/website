import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { allPages } from 'content-collections';
import type { Metadata } from 'next';

const page = allPages.find((page) => page._meta.fileName === 'home.mdx');

if (!page) {
  throw new Error('Home page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/og?title=${page.title}&description=${page.description}`,
});

const HomePage = () => (
  <>
    <article>
      <Section delay={0.2}>
        <Mdx code={page.body} />
      </Section>
    </article>
  </>
);

export default HomePage;
