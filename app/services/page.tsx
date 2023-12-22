import { Link } from '@/components/link';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import services from '@/data/services.json';
import type { FC } from 'react';

const Services: FC = () => (
  <Container>
    <h1>Services</h1>
    <p>
      I have limited availability and occasionally take on freelance projects
      and consulting. I&apos;m also open to joining boards and advisory roles.
      If you&apos;re interested, please get in touch.
    </p>
    <div className="space-y-4">
      {services.map((service) => (
        <Card
          className="not-prose overflow-hidden bg-white dark:bg-zinc-800"
          key={service.name}
        >
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <p>asd</p>
          </CardContent>
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
