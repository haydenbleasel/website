import type { allPosts } from "@/.content-collections/generated";
import { Card } from "@/components/card";
import { formatDate } from "@/lib/utils";

type ArticleProps = {
  article: (typeof allPosts)[number];
};

export const Article = ({ article }: ArticleProps) => (
  <Card as="article">
    <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
    <Card.Eyebrow as="time" dateTime={article.date.toISOString()} decorate>
      {formatDate(article.date)}
    </Card.Eyebrow>
    <Card.Description>{article.description}</Card.Description>
    <Card.Cta>Read article</Card.Cta>
  </Card>
);
