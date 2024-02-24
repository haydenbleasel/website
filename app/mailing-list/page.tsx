import { Container } from '@/components/container';
import { MailingList } from '@/components/mailing-list';
import { Label } from '@/components/ui/label';
import { createMetadata } from '@/lib/metadata';
import type { FC } from 'react';

const title = 'Mailing List';
const description =
  'Join 2100+ readers and get periodic updates on new projects and updates. No spam, ever.';

export const metadata = createMetadata({
  title,
  description,
  path: '/mailing-list',
});

const MailingListPage: FC = () => (
  <Container>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 space-y-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
      <Label htmlFor="email">Email address</Label>
      <MailingList />
    </div>
  </Container>
);

export default MailingListPage;
