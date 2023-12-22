import { get } from '@vercel/edge-config';
import { createMetadata } from '@/lib/metadata';
import { MailingList } from '@/components/mailing';
import { Container } from '@/components/container';
import { Social } from './components/social';
import { Announcement } from './components/announcement';
import type { AnnouncementProps } from './components/announcement';
import type { Metadata } from 'next';
import type { ReactElement } from 'react';

const title = 'Product Designer and TypeScript Developer';
const description =
  'Chief Product Officer at Corellium, advisor at Raw Studio and previously founder of Jellypepper.';

export const metadata: Metadata = createMetadata({
  title,
  description,
});

const Home = async (): Promise<ReactElement> => {
  const announcement = await get<AnnouncementProps>('announcement');

  return (
    <Container>
      <h1>
        Chief Product Officer.
        <br />
        TypeScript Engineer.
        <br />
        Product Designer.
        <br />
        Indie maker.
      </h1>
      {announcement ? <Announcement {...announcement} /> : null}
      <p>Hi, I&apos;m Hayden Bleasel.</p>
      <MailingList />
      <Social />
    </Container>
  );
};

export default Home;
