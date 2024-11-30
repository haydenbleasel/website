import type { ReactNode } from 'react';
import { Balancer } from 'react-wrap-balancer';

type HeroProps = {
  caption: string;
  title: string;
  children?: ReactNode;
};

export const HeroSection = ({ caption, title, children }: HeroProps) => (
  <section className="flex flex-col items-center justify-center gap-4 px-4 py-20 sm:px-0">
    <small className="text-base text-muted-foreground">{caption}</small>
    <h1 className="text-center font-bold text-5xl leading-tight tracking-tight">
      <Balancer>{title}</Balancer>
    </h1>
    {children}
  </section>
);
