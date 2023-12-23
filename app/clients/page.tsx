import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { clients } from '@/data/clients';
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
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px not-prose">
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
              className="my-0 mx-auto h-12 w-16 object-contain translate-y-8 group-hover:translate-y-3 transition-transform"
              width={64}
              height={48}
            />
            <div className="text-center opacity-0 group-hover:opacity-100 translate-y-6 transition-all text-sm group-hover:translate-y-4">
              <p className="text-zinc-900 dark:text-zinc-100 font-medium line-clamp-1">
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
