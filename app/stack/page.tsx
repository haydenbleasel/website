import Image from 'next/image';
import { Link } from '@/components/link';
import stack from '@/data/stack.json';
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
      className="no-underline items-center flex gap-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-4 rounded-lg transition-colors"
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
          <p className="text-sm text-neutral-900 dark:text-neutral-100 font-medium">
            {data.name}
          </p>
          {data.featured ? (
            <span className="text-xs px-2 bg-neutral-100 rounded-full font-medium">
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
  <main className="px-4 py-16 sm:py-32">
    <div className="space-y-12 prose prose-neutral prose-orange mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl m-0">{title}</h1>
        <p className="m-0 text-lg">{description}</p>
      </header>
      <div className="mt-8 grid gap-8 not-prose">
        {Object.values(stack).map(({ items, type }) => (
          <div className="rounded-2xl bg-gray-100 p-1" key={type}>
            <p className="text-neutral-900 dark:text-neutral-100 font-medium py-2 px-4">
              {type}
            </p>
            <div className="grid sm:grid-cols-2 bg-white border border-gray-200 rounded-xl overflow-hidden p-2 gap-x-2 shadow-sm">
              {items.map((item) => (
                <Tool data={item} key={item.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default Stack;
