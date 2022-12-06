import Link from 'next/link';
import type { FC } from 'react';
import { Fragment } from 'react';
import Divider from '@/components/divider';
import speaking from '@/content/speaking.json';
import articles from '@/content/articles.json';
import formatDate from '@/lib/formatDate';

type FeatureProps = {
  name: string;
  source: string;
  link?: string;
  date: string;
};

const FeatureInner: FC<Omit<FeatureProps, 'link'>> = ({
  name,
  source,
  date,
}) => (
  <>
    <span className="flex-1 line-clamp-1">
      <span className="flex-0 flex items-center gap-2 font-medium text-zinc-900 line-clamp-1 dark:text-white">
        {name}
      </span>
      <span className="flex-1 text-sm font-light text-zinc-500 line-clamp-1 dark:text-zinc-400">
        {source}
      </span>
    </span>
    <span className="flex-shrink-0 text-sm font-light text-zinc-500 sm:leading-[28px]">
      {formatDate(new Date(date))}
    </span>
  </>
);

const Feature: FC<FeatureProps> = ({ link, ...props }) =>
  link ? (
    <Link
      href={link}
      className="flex flex-col gap-1 py-2 no-underline sm:flex-row sm:gap-8"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FeatureInner {...props} />
    </Link>
  ) : (
    <div className="flex flex-col gap-1 py-2 no-underline sm:flex-row sm:gap-8">
      <FeatureInner {...props} />
    </div>
  );

const Press: FC = () => (
  <main className="flex flex-col gap-6 prose-h2:mb-2 prose-h2:mt-4 prose-p:m-0">
    <h1>Press</h1>
    <div className="flex flex-col gap-2">
      <h2>Speaking</h2>
      <div>
        {speaking.map((feature, index) => (
          <Fragment key={feature.name}>
            {index > 0 && <Divider />}
            <Feature {...feature} />
          </Fragment>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <h2>Articles</h2>
      <div>
        {articles.map((feature, index) => (
          <Fragment key={feature.name}>
            {index > 0 && <Divider />}
            <Feature {...feature} />
          </Fragment>
        ))}
      </div>
    </div>
  </main>
);

export default Press;
