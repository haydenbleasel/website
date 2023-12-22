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
    <h1 className="mb-0">{title}</h1>
    <p>
      Join 1800+ readers and get periodic updates on new projects and updates.
      No spam, ever.
    </p>
    <div className="mt-8 space-y-1">
      <Label htmlFor="email">Email address</Label>
      <MailingList />
    </div>
  </Container>
);

export default MailingListPage;
