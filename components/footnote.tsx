import type { ReactNode } from 'react';
import { Link } from './link';

type FootnoteMarkerProps = {
  index: number;
};

type FootnoteContentProps = {
  index: number;
  children: ReactNode;
};

export const FootnoteMarker = ({ index }: FootnoteMarkerProps) => (
  <Link href={`#fn-${index}`} className="border-none">
    <sup className="text-foreground-lighter text-xs">{index}</sup>
  </Link>
);

export const FootnoteContent = ({ index, children }: FootnoteContentProps) => (
  <p className="text-foreground-lighter text-sm" id={`fn-${index}`}>
    <sup>{index}</sup> {children}
  </p>
);
