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

const Feature: FC<FeatureProps> = ({ name, source, link, date }) => (
  <Link
    href={link ?? ''}
    className="no-underline flex flex-col gap-1 py-2 sm:flex-row sm:gap-8"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="flex-1 truncate">
      <span className="flex-0 flex items-center gap-2">{name}</span>
      <span className="truncate font-light text-sm flex-1 text-gray-500 dark:text-gray-400">
        {source}
      </span>
    </span>
    <span className="flex-shrink-0 text-gray-500 text-sm sm:leading-[28px] font-light">
      {formatDate(new Date(date))}
    </span>
  </Link>
);

const Press: FC = () => (
  <main className="flex flex-col gap-6 prose-p:m-0 prose-h2:mb-2 prose-h2:mt-4">
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