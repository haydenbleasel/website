import { Container } from '@/components/container';
import { MailingList } from '@/components/mailing';
import { Label } from '@/components/ui/label';
import { createMetadata } from '@/lib/metadata';
import type { FC } from 'react';

const title = 'Mailing List';
const description =
  'Sign up for my mailing list to receive updates on new posts and projects.';

export const metadata = createMetadata({
  title,
  description,
  path: '/mailing-list',
});

const MailingListPage: FC = () => (
  <Container>
    <section className="flex flex-col gap-1">
      <p className="m-0 text-neutral-900 dark:text-white font-medium text-sm">
        {title}
      </p>
      <p className="m-0 text-neutral-600 dark:text-neutral-400 text-sm">
        {description}
      </p>
    </section>
    <div className="space-y-1">
      <Label htmlFor="email">Email address</Label>
      <MailingList />
    </div>
  </Container>
);

export default MailingListPage;
