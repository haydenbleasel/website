import { Link } from './link';

type FeatureProps = {
  name: string;
  location: string;
  year: number;
  url: string;
};

export const Feature = ({ name, location, year, url }: FeatureProps) => (
  <Link
    href={url}
    className="group flex flex-col gap-1 overflow-hidden text-sm sm:flex-row sm:items-center sm:gap-2"
  >
    <span className="flex flex-col gap-1 truncate sm:flex-row sm:items-center sm:gap-2">
      <p className="truncate text-foreground">{name}</p>
      <p className="shrink-0 text-foreground-lighter transition-colors group-hover:text-foreground-light">
        {location}
      </p>
    </span>
    <div className="hidden h-px shrink-0 grow bg-border transition-colors group-hover:bg-border-dark sm:block" />
    <p className="shrink-0 text-foreground-lighter transition-colors group-hover:text-foreground-light">
      {year}
    </p>
  </Link>
);
