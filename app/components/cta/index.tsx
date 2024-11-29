import { Newsletter } from './newsletter';
import { Teaser } from './teaser';

export const CallToAction = () => (
  <section className="grid grid-cols-2 gap-8 p-8">
    <Teaser />
    <Newsletter />
  </section>
);
