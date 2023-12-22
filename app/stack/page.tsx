import { Link } from '@/components/link';
import { createMetadata } from '@/lib/metadata';
import { Section } from '@/components/section';
import stack from '@/data/stack.json';
import { Container } from '@/components/container';
import type { FC } from 'react';

const title = 'Stack';
const description = 'Tools and technologies I use.';

export const metadata = createMetadata({ title, description, path: '/stack' });

const Stack: FC = () => (
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
      {stack.map(({ type, items }) => (
        <Section title={type} key={type}>
          {items.map((tool) => (
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 justify-between"
              key={tool.name}
            >
              <Link
                className="m-0 text-neutral-900 dark:text-white text-sm sm:truncate w-[7rem]"
                href={tool.href}
              >
                {tool.name}
              </Link>
              <p className="m-0 text-neutral-600 dark:text-neutral-400 text-xs sm:text-right">
                {tool.description}
              </p>
            </div>
          ))}
        </Section>
      ))}
    </div>
  </Container>
);

export default Stack;
