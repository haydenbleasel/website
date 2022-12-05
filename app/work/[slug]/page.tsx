import { notFound } from 'next/navigation';
import { allWorkPosts } from 'contentlayer/generated';
import type { ReactNode } from 'react';

import { Mdx } from '@/components/mdx';
import { getTableOfContents } from '@/lib/tableOfContents';
import TableOfContents from '@/app/blog/[slug]/tableOfContents';

type DocPageProps = {
  params?: {
    slug?: string;
  };
};

export const generateStaticParams = (): DocPageProps['params'][] =>
  allWorkPosts.map((doc) => ({
    slug: doc.slug,
  }));

const DocPage = async ({ params }: DocPageProps): Promise<ReactNode> => {
  const currentPath = params?.slug;
  const doc = allWorkPosts.find(
    ({ slugAsParams }) => slugAsParams === currentPath
  );

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="prose">
      <h1>
        {doc.role} at {doc.company}
      </h1>
      <p className="text-xl">{doc.description}</p>
      <Mdx code={doc.body.code} />
      <TableOfContents toc={toc} />
    </main>
  );
};

export default DocPage;
