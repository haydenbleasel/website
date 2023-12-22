import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import clients from '@/data/clients.json';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
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
    <h1>{title}</h1>
    <p>{description}</p>
    <div className="grid grid-cols-4 gap-px not-prose">
      {Object.values(clients).map(({ source, items }) =>
        items.map(({ name, logo }) => (
          <div
            key={name}
            className={cn(
              'group space-y-2 items-center justify-center p-4 aspect-square ring-1 transition-colors',
              'ring-zinc-200 bg-transparent hover:bg-zinc-100',
              'dark:ring-zinc-800 dark:hover:bg-zinc-800'
            )}
          >
            <Image
              src={logo}
              alt={name}
              className="m-0 h-16 w-16 object-contain translate-y-6 group-hover:translate-y-0 transition-transform"
              width={64}
              height={64}
            />
            <div className="text-center opacity-0 group-hover:opacity-100 translate-y-6 transition-all text-sm group-hover:translate-y-0">
              <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                {name}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400">{source}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </Container>
);

export default Clients;
