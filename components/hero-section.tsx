import { BaseHubImage } from 'basehub/next-image';
import { Children, type ReactNode } from 'react';
import { Balancer } from 'react-wrap-balancer';
import { ViewAnimation } from '../providers/view-animation';
import { Section } from './section';

type HeroProps = {
  image?: {
    url: string;
    alt?: string;
    width: number;
    height: number;
  };
  caption?: string | null;
  title: string;
  children?: ReactNode;
};

export const HeroSection = ({ image, caption, title, children }: HeroProps) => (
  <Section className="p-4">
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-background py-20 shadow-sm sm:px-0">
      {image && (
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <BaseHubImage
            src={image.url}
            alt={image.alt ?? ''}
            width={image.width}
            height={image.height}
          />
        </ViewAnimation>
      )}
      {caption && (
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <small className="text-base text-muted-foreground">{caption}</small>
        </ViewAnimation>
      )}
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.4}
      >
        <h1 className="max-w-4xl text-center font-bold text-5xl leading-tight tracking-tight">
          <Balancer>{title}</Balancer>
        </h1>
      </ViewAnimation>
      {Children.map(children, (child, index) => (
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.8 + index * 0.4}
        >
          {child}
        </ViewAnimation>
      ))}
    </div>
  </Section>
);
