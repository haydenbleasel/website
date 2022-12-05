import { notFound } from 'next/navigation';
import { allBlogs } from 'contentlayer/generated';
import type { ReactNode } from 'react';

import TableOfContents from './tableOfContents';
import { Mdx } from '@/components/mdx';
import { getTableOfContents } from '@/lib/tableOfContents';

type DocPageProps = {
  params?: {
    slug?: string;
  };
};

export const generateStaticParams = (): DocPageProps['params'][] =>
  allBlogs.map((doc) => ({
    slug: doc.slug,
  }));

const DocPage = async ({ params }: DocPageProps): Promise<ReactNode> => {
  const currentPath = params?.slug;
  const doc = allBlogs.find(({ slugAsParams }) => slugAsParams === currentPath);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="prose">
      <h1>{doc.title}</h1>
      <p className="text-xl text-gray-600">{doc.description}</p>
      <Mdx code={doc.body.code} />
      <TableOfContents toc={toc} />
    </main>
  );
};

export default DocPage;
