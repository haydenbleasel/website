import type { allPosts } from 'content-collections';
import { Card } from '@/components/card';
import { formatDate } from '@/lib/format-date';

type ArticleProps = {
  article: (typeof allPosts)[number];
};

export const Article = ({ article }: ArticleProps) => (
  <article className="md:grid md:grid-cols-4 md:items-baseline">
    <Card className="md:col-span-3">
      <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
      <Card.Eyebrow
        as="time"
        className="md:hidden"
        dateTime={article.date.toISOString()}
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
      dateTime={article.date.toISOString()}
    >
      {formatDate(article.date)}
    </Card.Eyebrow>
  </article>
);
