import { allPosts } from 'content-collections';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/back-button';
import { Container } from '@/components/container';
import { Mdx } from '@/components/mdx';
import { Prose } from '@/components/prose';
import { formatDate } from '@/lib/format-date';
import { createMetadata } from '@/lib/metadata';

const getPage = (slug: string) => allPosts.find((post) => post.slug === slug);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    return {};
  }

  const metadata: Metadata = createMetadata({
    title: page.title,
    description: page.description,
  });

  return metadata;
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const article = getPage(slug);

  if (!article) {
    notFound();
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <BackButton />
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 font-bold text-4xl text-zinc-800 tracking-tight sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                dateTime={article.date.toISOString()}
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
            </header>
            <Prose className="mt-8" data-mdx-content>
              <Mdx code={article.body} />
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  );
};

export default Page;
