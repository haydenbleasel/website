import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { Section } from '../section';
import { Newsletter } from './newsletter';
import { Teaser } from './teaser';

export const CallToAction = () => (
  <Section className={cn('grid gap-8 bg-dashed p-4', 'sm:grid-cols-2 sm:p-8')}>
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      <Teaser />
    </ViewAnimation>
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      delay={0.4}
    >
      <Newsletter />
    </ViewAnimation>
  </Section>
);
