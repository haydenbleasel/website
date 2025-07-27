import { interviews, speaking } from '@/lib/live';
import { Link } from './link';

type Feature = (typeof speaking | typeof interviews)[number];

const groups = [
  {
    category: 'Interviews',
    data: interviews.sort((a, b) => b.year - a.year),
  },
  {
    category: 'Speaking',
    data: speaking.sort((a, b) => b.year - a.year),
  },
];

const FeatureItem = ({ name, url, location, year }: Feature) => (
  <div>
    <Link className="block break-words" href={url} key={name}>
      {name}
    </Link>
    <p className="block text-muted-foreground text-sm">
      {location} &bull; {year}
    </p>
  </div>
);

export const Features = () => (
  <div className="not-prose grid gap-16">
    {groups.map(({ category, data }) => (
      <section className="flex flex-col gap-8" key={category}>
        <h2 className="font-medium text-3xl">{category}</h2>
        <div className="grid gap-8">
          {data.map((feature) => (
            <FeatureItem key={feature.name} {...feature} />
          ))}
        </div>
      </section>
    ))}
  </div>
);
