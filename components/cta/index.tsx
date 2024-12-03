import { ViewAnimation } from '@/providers/view-animation';
import { Newsletter } from './newsletter';
import { Teaser } from './teaser';

export const CallToAction = () => (
  <section className="grid grid-cols-2 gap-8 bg-dashed p-8">
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
  </section>
);
