import { get } from '@vercel/edge-config';
import Image from 'next/image';
import { Link } from '@/components/link';
import { createMetadata } from '@/lib/metadata';
import { MailingList } from '@/components/mailing';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import Profile from './profile.jpg';
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
  const announcement = await get<{
    readonly text: string;
    readonly cta: string;
    readonly link: string;
  }>('announcement');

  if (!announcement) {
    throw new Error('Announcement not found');
  }

  return (
    <Container wide>
      <Image
        src={Profile}
        width={1158}
        height={1593}
        alt=""
        placeholder="blur"
        className="rounded overflow-hidden float-right max-w-[15rem] m-8 mt-0"
      />

      <div className="max-w-prose">
        <h1 className="text-4xl lg:text-5xl tracking-tighter">
          Chief Product Officer.
          <br />
          TypeScript Engineer.
          <br />
          Product Designer.
          <br />
          Indie maker.
        </h1>

        <p>
          Hi, I&apos;m Hayden Bleasel. I&apos;m the CPO at{' '}
          <Link href="/work/corellium">Corellium</Link> — a virtual hardware
          platform for government agencies and large enterprises to perform
          security research, penetration testing and development on mobile and
          IoT devices. I run the product management, customer support and design
          teams and am currently based in Delray Beach, Florida.
        </p>
        <p>
          Previously I ran an agency called{' '}
          <Link href="/work/jellypepper">Jellypepper</Link>. We worked with
          startups in self-driving car tech, AI, biotech, crypto, drone
          delivery, cybersecurity and even orbital (outer space) logistics.
          Jellypepper was{' '}
          <Link href="https://raw.studio/blog/raw-studio-acquires-jellypepper-to-expand-its-reach-to-the-startup-ecosystem/">
            acquired
          </Link>{' '}
          in 2023 by Raw Studio, where I joined them as an Advisor.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 divide-x divide-zinc-200 dark:divide-zinc-700">
        <div className="text-sm pr-4">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Latest Update
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
            {announcement.text}
          </p>
          <Button asChild variant="secondary">
            <Link href={announcement.link} className="no-underline">
              {announcement.cta}
            </Link>
          </Button>
        </div>
        <div className="text-sm pl-4">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Newsletter
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
            Join 1800+ readers and get periodic updates on new projects and
            updates. No spam, ever.
          </p>
          <MailingList />
        </div>
      </div>
    </Container>
  );
};

export default Home;
