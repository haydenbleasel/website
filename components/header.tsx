import type { FC } from 'react';

type HeaderProperties = {
  readonly title: string;
  readonly description: string;
};

export const Header: FC<HeaderProperties> = ({ title, description }) => (
  <header className="space-y-2">
    <h1 className="m-0 text-3xl">{title}</h1>
    <p className="m-0 text-lg">{description}</p>
  </header>
);
