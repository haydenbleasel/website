import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { allPages } from 'content-collections';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const getPage = (slug: string[] | undefined) => {
  const parsedSlug = slug === undefined ? 'home' : slug.join('/');
  const page = allPages.find(
    (page) => page._meta.fileName === `${parsedSlug}.mdx`
  );

  return page;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    image: `/og?title=${page.title}&description=${page.description}`,
  });
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Section className="gap-0">
        <h1>{page.title}</h1>
        <p className="text-muted-foreground">{page.description}</p>
      </Section>
      <article>
        <Section delay={0.2}>
          <Mdx code={page.body} />
        </Section>
      </article>
    </>
  );
};

export default Page;
