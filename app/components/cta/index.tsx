import { Newsletter } from './newsletter';
import { Teaser } from './teaser';

export const CallToAction = () => (
  <section>
    <div className="container mx-auto py-8">
      <Teaser />
      <Newsletter />
    </div>
  </section>
);
