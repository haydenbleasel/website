import Image from 'next/image';
import { Link } from '@/components/link';
import stack from '@/data/stack.json';
import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Stack';
const description = 'Tools and technologies I use.';

export const metadata: Metadata = {
  title,
  description,
};

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
      className={cn(
        'no-underline items-center flex gap-4 p-4 rounded-lg transition-colors',
        'hover:bg-neutral-100',
        'dark:hover:bg-neutral-800'
      )}
    >
      <Image
        src={`https://logo.clearbit.com/${hostname.replace('www.', '')}`}
        alt={hostname}
        width={32}
        height={32}
        className="rounded-md"
        quality={100}
      />
      <div>
        <div className="flex items-center gap-2">
          <p
            className={cn(
              'text-sm font-medium',
              'text-neutral-900',
              'dark:text-neutral-100'
            )}
          >
            {data.name}
          </p>
          {data.featured ? (
            <span
              className={cn(
                'text-xs px-2 rounded-full font-medium',
                'bg-neutral-100 text-neutral-700',
                'dark:bg-neutral-800 dark:text-neutral-300'
              )}
            >
              Featured
            </span>
          ) : null}
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {data.description}
        </p>
      </div>
    </Link>
  );
};

const Stack: FC = () => (
  <>
    <Header title={title} description={description} />
    <div className="mt-8 grid gap-8 not-prose">
      {Object.values(stack).map(({ items, type }) => (
        <Card
          key={type}
          title={type}
          className="p-2 grid sm:grid-cols-2 gap-x-2"
        >
          {items.map((item) => (
            <Tool data={item} key={item.name} />
          ))}
        </Card>
      ))}
    </div>
  </>
);

export default Stack;
