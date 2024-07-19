import { Header } from '@/components/header';
import { Link } from '@/components/link';
import features from '@/data/features.json';
import speaking from '@/data/speaking.json';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Features';
const description = 'Speaking engagements and press coverage.';

export const metadata: Metadata = {
  title,
  description,
};

const data = [...speaking, ...features].sort((itemA, itemB) =>
  itemA.year > itemB.year ? -1 : 1
);

const FeatureInner: FC<{
  readonly name: string;
  readonly year: number;
  readonly location: string;
}> = ({ name, year, location }) => (
  <>
    <p className="m-0 sm:truncate">
      <span className="font-medium text-neutral-950 transition-colors group-hover:text-orange-500 dark:text-white">
        {name}
      </span>
      <span className="text-neutral-500 transition-colors group-hover:text-orange-400 dark:text-neutral-400">
        , {location}
      </span>
    </p>
    <hr className="m-0 hidden min-w-7 flex-1 transition-colors group-hover:border-orange-400 sm:block" />
    <p className="m-0 shrink-0 text-sm transition-colors group-hover:text-orange-400">
      {year}
    </p>
  </>
);

const Feature: FC<(typeof data)[0]> = ({ name, year, location, url }) => {
  const baseClassName =
    'flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 no-underline text-inherit font-normal group transition-colors';

  return typeof url === 'string' && url ? (
    <Link key={name} href={url} className={baseClassName}>
      <FeatureInner name={name} year={year} location={location} />
    </Link>
  ) : (
    <div key={name} className={baseClassName}>
      <FeatureInner name={name} year={year} location={location} />
    </div>
  );
};

const Work: FC = () => (
  <>
    <Header title={title} description={description} />
    <div className="mt-8 grid gap-4">
      {data.map((feature) => (
        <Feature key={feature.name} {...feature} />
      ))}
    </div>
  </>
);

export default Work;
