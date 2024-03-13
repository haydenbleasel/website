import { Link } from '@/components/link';
import speaking from '@/data/speaking.json';
import features from '@/data/features.json';
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
  readonly year: string;
  readonly location: string;
}> = ({ name, year, location }) => (
  <>
    <p className="m-0 whitespace-nowrap truncate">
      <span className="text-neutral-950 font-medium group-hover:text-orange-500 transition-colors">
        {name}
      </span>
      <span className="text-neutral-500 group-hover:text-orange-400 transition-colors">
        , {location}
      </span>
    </p>
    <hr className="min-w-7 flex-1 m-0 group-hover:border-orange-400 transition-colors" />
    <p className="shrink-0 m-0 text-sm group-hover:text-orange-400 transition-colors">
      {year}
    </p>
  </>
);

const Feature: FC<(typeof data)[0]> = ({ name, year, location, url }) => {
  const baseClassName =
    'flex items-center gap-4 no-underline text-inherit font-normal group transition-colors';

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
  <main className="px-4 py-16 sm:py-32">
    <div className="space-y-12 prose prose-neutral prose-orange mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl m-0">{title}</h1>
        <p className="m-0 text-lg">{description}</p>
      </header>
      <div className="mt-8 grid gap-4">
        {data.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  </main>
);

export default Work;
