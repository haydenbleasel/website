import type { ReactNode } from 'react';
import { Balancer } from 'react-wrap-balancer';
import { ViewAnimation } from './view-animation';

type HeroProps = {
  caption: string;
  title: string;
  children?: ReactNode;
};

export const HeroSection = ({ caption, title, children }: HeroProps) => (
  <section className="flex flex-col items-center justify-center gap-4 px-4 py-20 sm:px-0">
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      <small className="text-base text-muted-foreground">{caption}</small>
    </ViewAnimation>
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      delay={0.4}
    >
      <h1 className="max-w-4xl text-center font-bold text-5xl leading-tight tracking-tight">
        <Balancer>{title}</Balancer>
      </h1>
    </ViewAnimation>
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      delay={0.8}
    >
      {children}
    </ViewAnimation>
  </section>
);
