import { Container } from '@/components/container';
import { MailingList } from '@/components/mailing';
import { Label } from '@/components/ui/label';
import { createMetadata } from '@/lib/metadata';
import type { FC } from 'react';

const title = 'Mailing List';
const description =
  'Join 1800+ readers and get periodic updates on new projects and updates. No spam, ever.';

export const metadata = createMetadata({
  title,
  description,
  path: '/mailing-list',
});

const MailingListPage: FC = () => (
  <Container>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 space-y-1">
      <Label htmlFor="email">Email address</Label>
      <MailingList />
    </div>
  </Container>
);

export default MailingListPage;
