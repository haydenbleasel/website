import { createMetadata } from '@/lib/metadata';
import speaking from '@/data/speaking.json';
import { Link } from '@/components/link';
import { Container } from '@/components/container';
import type { FC } from 'react';

const title = 'Speaking';
const description = 'A list of conferences and meetups I have spoken at.';

export const metadata = createMetadata({
  title,
  description,
  path: '/speaking',
});

const Speaking: FC = () => (
  <Container>
    <section className="flex flex-col gap-1">
      <p className="m-0 text-zinc-900 dark:text-white font-medium text-sm">
        {title}
      </p>
      <p className="m-0 text-zinc-600 dark:text-zinc-400 text-sm">
        {description}
      </p>
    </section>
    <div className="flex flex-col gap-2">
      {speaking.map(({ location, name, year, href }) => (
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4"
          key={name}
        >
          <p className="m-0 sm:truncate font-medium text-zinc-900 dark:text-white">
            {href ? (
              <Link href={href}>
                {name}, {location}
              </Link>
            ) : (
              `${name}, ${location}`
            )}
          </p>
          <p className="m-0 text-zinc-600 dark:text-zinc-400 text-xs w-10 sm:text-right shrink-0">
            {year}
          </p>
        </div>
      ))}
    </div>
  </Container>
);

export default Speaking;
