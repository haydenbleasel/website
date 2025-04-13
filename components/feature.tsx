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
    className="group flex items-center gap-2 overflow-hidden text-sm"
  >
    <span className="flex items-center gap-2 truncate">
      <p className="truncate text-foreground">{name}</p>
      <p className="shrink-0 text-foreground-lighter transition-colors group-hover:text-foreground-light">
        {location}
      </p>
    </span>
    <div className="h-px shrink-0 grow bg-border transition-colors group-hover:bg-border-dark" />
    <p className="shrink-0 text-foreground-lighter transition-colors group-hover:text-foreground-light">
      {year}
    </p>
  </Link>
);
