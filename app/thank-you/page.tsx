import type { Metadata } from 'next';

import { SimpleLayout } from '@/components/simple-layout';

export const metadata: Metadata = {
  title: 'You’re subscribed',
  description: 'Thanks for subscribing to my newsletter.',
};

export default function ThankYou() {
  return (
    <SimpleLayout
      intro="I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
      title="Thanks for subscribing."
    />
  );
}
