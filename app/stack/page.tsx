import Image from 'next/image';
import { Link } from '@/components/link';
import { createMetadata } from '@/lib/metadata';
import stack from '@/data/stack.json';
import { Container } from '@/components/container';

import { Badge } from '@/components/ui/badge';
import type { FC } from 'react';

const title = 'Stack';
const description = 'Tools and technologies I use.';

export const metadata = createMetadata({ title, description, path: '/stack' });

const Tool: FC<{
  readonly data: {
    readonly href: string;
    readonly name: string;
    readonly description: string;
    readonly featured?: boolean;
  };
}> = ({ data }) => {
  const { hostname } = new URL(data.href);

  return (
    <Link
      href={data.href}
      key={data.href}
      className="no-underline items-center flex gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-4 rounded-md transition-colors"
    >
      <Image
        src={`https://logo.clearbit.com/${hostname.replace('www.', '')}`}
        alt={hostname}
        width={32}
        height={32}
        className="rounded-md"
      />
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">
            {data.name}
          </p>
          {data.featured ? (
            <Badge variant="secondary" className="rounded-full">
              Featured
            </Badge>
          ) : null}
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {data.description}
        </p>
      </div>
    </Link>
  );
};

const Stack: FC = () => (
  <Container wide>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 grid gap-8 not-prose">
      {Object.values(stack).map(({ items, type }) => (
        <div
          className="border border-zinc-200 dark:border-zinc-800 rounded-md p-4 space-y-4"
          key={type}
        >
          <p className="text-zinc-900 dark:text-zinc-100 font-semibold">
            {type}
          </p>
          <div className="grid sm:grid-cols-2">
            {items.map((item) => (
              <Tool data={item} key={item.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </Container>
);

export default Stack;
