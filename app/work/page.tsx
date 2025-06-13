import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
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

const WorkPage = () => (
  <>
    <Section className="gap-0">
      <h1>{page.title}</h1>
      <p className="text-foreground-lighter">{page.description}</p>
    </Section>
    <article>
      <Section>
        <Mdx code={page.body} />
      </Section>
    </article>
  </>
);

export default WorkPage;
