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
    <h1>{title}</h1>

    <div className="space-y-1">
      <Label htmlFor="email">Email address</Label>
      <MailingList />
    </div>
  </Container>
);

export default MailingListPage;
