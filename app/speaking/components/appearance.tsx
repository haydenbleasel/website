import { Card } from '@/components/card';

type AppearanceProps = {
  title: string;
  description: string;
  href: string;
};

export const Appearance = ({ title, description, href }: AppearanceProps) => (
  <Card as="article">
    <Card.Title as="h3">
      {href ? (
        <Card.Link href={href} rel="noopener noreferrer" target="_blank">
          {title}
        </Card.Link>
      ) : (
        title
      )}
    </Card.Title>
    <Card.Description>{description}</Card.Description>
  </Card>
);
