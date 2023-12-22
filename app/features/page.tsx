import { createMetadata } from '@/lib/metadata';
import features from '@/data/features.json';
import { Link } from '@/components/link';
import { Container } from '@/components/container';
import type { FC } from 'react';

const title = 'Features';
const description = 'Articles, podcasts, and other features.';

export const metadata = createMetadata({
  title,
  description,
  path: '/features',
});

const Features: FC = () => (
  <Container>
    <section className="flex flex-col gap-1">
      <p className="m-0 text-neutral-900 dark:text-white font-medium text-sm">
        {title}
      </p>
      <p className="m-0 text-neutral-600 dark:text-neutral-400 text-sm">
        {description}
      </p>
    </section>
    <div className="flex flex-col gap-2">
      {features.map(({ name, year, href }) => (
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4"
          key={name}
        >
          <p className="m-0 sm:truncate font-medium text-neutral-900 dark:text-white">
            <Link href={href}>{name}</Link>
          </p>
          <p className="m-0 text-neutral-600 dark:text-neutral-400 text-xs w-10 sm:text-right shrink-0">
            {year}
          </p>
        </div>
      ))}
    </div>
  </Container>
);

export default Features;
