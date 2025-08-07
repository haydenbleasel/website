import type { Metadata } from 'next';

import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles';
import { formatDate } from '@/lib/formatDate';

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          className="md:hidden"
          dateTime={article.date}
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        className="mt-1 max-md:hidden"
        dateTime={article.date}
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
};

export default async function ArticlesIndex() {
  const articles = await getAllArticles();

  return (
    <SimpleLayout
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      title="Writing on software design, company building, and the aerospace industry."
    >
      <div className="md:border-zinc-100 md:border-l md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article article={article} key={article.slug} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}
