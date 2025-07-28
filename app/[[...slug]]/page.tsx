import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/mdx';
import { getPage } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const page = getPage(slug?.join('/') ?? 'home');

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    image: `/og?slug=${slug?.join('/')}`,
  });
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const page = getPage(slug?.join('/') ?? 'home');

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
