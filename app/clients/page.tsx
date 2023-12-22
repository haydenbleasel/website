import { createMetadata } from '@/lib/metadata';
import { Section } from '@/components/section';
import clients from '@/data/clients.json';
import { Container } from '@/components/container';
import type { FC } from 'react';

const title = 'Clients';
const description = 'Past and current freelance and agency clients.';

export const metadata = createMetadata({
  title,
  description,
  path: '/clients',
});

const Clients: FC = () => (
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
      {clients.map(({ source, items }) => (
        <Section title={source} key={source}>
          {items.map((client) => (
            <p
              className="m-0 text-zinc-900 dark:text-white text-sm"
              key={client}
            >
              {client}
            </p>
          ))}
        </Section>
      ))}
    </div>
  </Container>
);

export default Clients;
