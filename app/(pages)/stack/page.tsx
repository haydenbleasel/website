import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { Link } from '@/components/link';
import stack from '@/data/stack.json';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import Image from 'next/image';
import type { FC } from 'react';

const title = 'Stack';
const description = 'Tools and technologies I use.';

export const metadata: Metadata = {
  title,
  description,
};

const logoDevToken = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

if (!logoDevToken) {
  throw new Error('NEXT_PUBLIC_LOGO_DEV_TOKEN is not set');
}

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
        'flex items-center gap-4 rounded-lg p-4 no-underline transition-colors',
        'hover:bg-neutral-100',
        'dark:hover:bg-neutral-800'
      )}
    >
      <Image
        src={`https://img.logo.dev/${hostname.replace('www.', '')}?token=${logoDevToken}`}
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
              'font-medium text-sm',
              'text-neutral-900',
              'dark:text-neutral-100'
            )}
          >
            {data.name}
          </p>
          {data.featured ? (
            <span
              className={cn(
                'rounded-full px-2 font-medium text-xs',
                'bg-neutral-100 text-neutral-700',
                'dark:bg-neutral-800 dark:text-neutral-300'
              )}
            >
              Featured
            </span>
          ) : undefined}
        </div>
        <p className="text-neutral-500 text-sm dark:text-neutral-400">
          {data.description}
        </p>
      </div>
    </Link>
  );
};

const Stack: FC = () => (
  <>
    <Header title={title} description={description} />
    <div className="not-prose mt-8 grid gap-8">
      {Object.values(stack).map(({ items, type }) => (
        <Card
          key={type}
          title={type}
          className="grid gap-x-2 p-2 sm:grid-cols-2"
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
