import { allPosts } from 'content-collections';
import type { Metadata } from 'next';
import { SimpleLayout } from '@/components/simple-layout';
import { createMetadata } from '@/lib/metadata';
import { Article } from './components/article';

export const metadata: Metadata = createMetadata({
  title: 'Blog',
  description:
    'All of my long-form thoughts on software design and product updates.',
});

const sortedPosts = allPosts.sort(
  (a, b) => b.date.getTime() - a.date.getTime()
);

const ArticlesIndex = () => (
  <SimpleLayout
    intro="All of my long-form thoughts on software design and product updates."
    title="My musings on software design and product updates."
  >
    <div className="md:border-zinc-100 md:border-l md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex max-w-3xl flex-col space-y-16">
        {sortedPosts.map((article) => (
          <Article article={article} key={article.slug} />
        ))}
      </div>
    </div>
  </SimpleLayout>
);

export default ArticlesIndex;
