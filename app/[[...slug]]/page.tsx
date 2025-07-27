import { allPages } from 'content-collections';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/mdx';
import { createMetadata } from '@/lib/metadata';

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
      {slug && (
        <div className="not-prose not-prose mb-12 gap-0">
          <h1 className="font-medium text-4xl">{page.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {page.description}
          </p>
        </div>
      )}
      <article>
        <Mdx code={page.body} />
      </article>
    </>
  );
};

export default Page;
