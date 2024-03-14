import type { FC } from 'react';

type HeaderProps = {
  readonly title: string;
  readonly description: string;
};

export const Header: FC<HeaderProps> = ({ title, description }) => (
  <header className="space-y-2">
    <h1 className="text-3xl m-0">{title}</h1>
    <p className="m-0 text-lg">{description}</p>
  </header>
);
