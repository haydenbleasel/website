import { Card } from '@/components/card';
import type { ArticleWithSlug } from '@/lib/articles';
import { formatDate } from '@/lib/format-date';

export const Article = ({ article }: { article: ArticleWithSlug }) => (
  <Card as="article">
    <Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
    <Card.Eyebrow as="time" dateTime={article.date} decorate>
      {formatDate(article.date)}
    </Card.Eyebrow>
    <Card.Description>{article.description}</Card.Description>
    <Card.Cta>Read article</Card.Cta>
  </Card>
);
