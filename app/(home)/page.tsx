import Image from 'next/image';
import { Link } from '@/components/link';
import { Newsletter } from '@/components/newsletter';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import PageLayout from '@/app/(pages)/layout';
import Avatar from './avatar.jpg';
import Profile from './profile.jpg';
import Refraction from './refraction.jpg';
import Corellium from './corellium.svg';
import Eververse from './eververse.svg';
import Jellypepper from './jellypepper.svg';
import type { StaticImageData } from 'next/image';
import type { Metadata } from 'next';
import type { FC, ReactElement } from 'react';
import { get } from '@vercel/edge-config';
import { GameProps } from '../api/cron/steam/route';
import { SpotifyProps } from '../api/cron/spotify/route';

export const metadata: Metadata = {
  title: 'Hayden Bleasel',
  description:
    'I’m an Australian Product Designer and Software Engineer currently based in Delray Beach, Florida. I’m currently the Chief Product Officer at Corellium and the founder of Eververse.',
};

type InlineImageProps = {
  readonly src: StaticImageData | string;
  readonly text: string;
  readonly url: string;
};

const InlineImage: FC<InlineImageProps> = ({ src, text, url }) => (
  <Link
    href={url}
    className="ml-0.5 dark:ml-0 inline-flex gap-1 items-center align-bottom"
  >
    <Image
      src={src}
      alt=""
      width={16}
      height={16}
      className="dark:hidden m-0 w-4 h-4 rounded-sm object-contain select-none"
      quality={100}
    />
    <span>{text}</span>
  </Link>
);

const Home = async (): Promise<ReactElement> => {
  const game = await get<GameProps>('steam');
  const song = await get<SpotifyProps>('spotify');

  return (
    <div className="flex items-start">
      <div className="flex-1">
        <div className="max-w-[38rem] mx-auto">
          <PageLayout>
            <Image
              src={Avatar}
              alt=""
              width={96}
              height={96}
              className={cn(
                'block xl:hidden m-0',
                'object-cover w-12 h-12 rounded-full'
              )}
              quality={100}
              loading="eager"
              priority
            />
            <Header
              title="Hayden Bleasel"
              description="Design · Engineering · Startups"
            />
            <main>
              <p>
                Hi, I’m Hayden Bleasel. I’m an Australian Product Designer and
                Software Engineer currently based in Delray Beach, Florida.
              </p>
              <p>
                I’m currently the Chief Product Officer at{' '}
                <InlineImage
                  src={Corellium as StaticImageData}
                  text="Corellium"
                  url="https://www.corellium.com/"
                />{' '}
                — a virtual hardware platform designed for governments, defense
                contractors and enterprises to perform security research and
                testing on Arm-based devices.
              </p>
              <p>
                After hours, I’m working on{' '}
                <InlineImage
                  src={Eververse}
                  text="Eververse"
                  url="https://www.eververse.ai/"
                />
                , a new type of Product Management tool designed to help Product
                teams triage feedback, explore problems, ideate solutions,
                prioritize features and plan roadmaps with the help of AI.
              </p>
              <p>
                Previously, I ran an agency called{' '}
                <InlineImage
                  src={Jellypepper as StaticImageData}
                  text="Jellypepper"
                  url="https://jellypepper.com/"
                />{' '}
                where I worked with startups in self-driving cars, AI, biotech,
                crypto, drone delivery, cybersecurity and even outer space
                logistics. Jellypepper was{' '}
                <Link href="https://raw.studio/blog/raw-studio-acquires-jellypepper-to-expand-its-reach-to-the-startup-ecosystem/">
                  acquired
                </Link>{' '}
                in 2023 by Raw Studio.
              </p>
              <p>
                I also founded{' '}
                <InlineImage
                  src={Refraction}
                  text="Refraction"
                  url="https://refraction.dev/"
                />
                , a suite of AI-based code improvement tools for developers,
                which was <Link href="/blog/refraction">acquired</Link> in 2023
                by Twistag.
              </p>
              <p>
                In my spare time, I enjoy working out, building open source
                projects like{' '}
                <Link href="https://www.next-forge.com/">next-forge</Link> and{' '}
                <Link href="https://www.npmjs.com/package/eslint-config-harmony">
                  Harmony
                </Link>
                , flying my{' '}
                <Link href="https://www.youtube.com/playlist?list=PLw95VUVc_2gh5oGx-jj9PnatiMKtQBiV2">
                  drone
                </Link>{' '}
                and playing video games.
              </p>
            </main>
            <div>
              <p>
                Join 2200+ readers and get infrequent updates on new projects.
              </p>
              <Newsletter />
            </div>
            <footer>
              <p className="m-0 font-medium text-sm text-neutral-500 dark:text-neutral-400">
                Latest activity
              </p>
              <div className="space-y-1 mt-4">
                {game && (
                  <div className="flex items-center gap-1">
                    <Image
                      src={game.image}
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4 rounded-sm object-contain select-none m-0"
                      quality={100}
                    />
                    Playing{' '}
                    <Link href={game.url} className="underline">
                      {game.name}
                    </Link>{' '}
                    (currently at {Math.round(game.playtime / 60)} hours)
                  </div>
                )}
                {song && (
                  <div className="flex items-center gap-1">
                    <Image
                      src={song.image}
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4 rounded-sm object-contain select-none m-0"
                      quality={100}
                    />
                    Listening to{' '}
                    <Link href={song.href} className="underline">
                      {song.name}
                    </Link>{' '}
                    by {song.artist}
                  </div>
                )}
              </div>
            </footer>
          </PageLayout>
        </div>
      </div>
      <Image
        src={Profile}
        alt=""
        width={3584}
        height={4608}
        className={cn(
          'hidden xl:block',
          'object-cover flex-0 h-screen sticky top-0 bottom-0 aspect-[3584/4608] w-auto max-w-[50vw] select-none'
        )}
        quality={100}
        loading="eager"
        priority
      />
    </div>
  );
};

export default Home;
