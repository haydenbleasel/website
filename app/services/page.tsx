import { Link } from '@/components/link';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import services from '@/data/services.json';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Services';
const description = 'What I can do for you.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/services',
});

const Services: FC = () => (
  <Container>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <p>
      I have limited availability and occasionally take on freelance projects
      and consulting. I&apos;m also open to joining boards and advisory roles.
      If you&apos;re interested, please get in touch.
    </p>
    <div className="mt-8 space-y-4">
      {services.map((service) => (
        <Card
          className="not-prose overflow-hidden bg-white dark:bg-zinc-800"
          key={service.name}
        >
          <CardHeader>
            <CardTitle className="leading-tight font-medium">
              {service.name}
            </CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href={service.link}>{service.cta}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </Container>
);

export default Services;
