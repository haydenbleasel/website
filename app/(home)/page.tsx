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
    <Container wide>
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
      <div className="not-prose bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 p-4 my-4 flex items-center justify-between gap-4">
        <div className="text-sm space-y-1">
          <p className="text-zinc-900 dark:text-zinc-100 font-medium">
            Join 1800+ readers
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
            Get periodic updates on new projects. No spam, ever.
          </p>
        </div>
        <MailingList />
      </div>
      <Social />
    </Container>
  );
};

export default Home;
