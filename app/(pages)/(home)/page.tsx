import { Skeleton } from '@/components/skeleton';
import { get } from '@vercel/edge-config';
import type { Metadata } from 'next';
import Image from 'next/image';
import { type ReactElement, Suspense } from 'react';
import Avatar from './avatar.jpg';
import { AnnouncementCard } from './cards/announcement';
import GitHubCard from './cards/github';
import SpotifyCard from './cards/spotify';
import SteamCard from './cards/steam';
import { Newsletter } from './components/newsletter';

export const generateMetadata = async (): Promise<Metadata> => {
  const location = await get<string>('location');

  return {
    title: 'Hayden Bleasel | Design Engineer',
    description: `I’m currently the Chief Product Officer at Corellium and the founder of Eververse. Currently based in ${location}.`,
  };
};

const Home = async (): Promise<ReactElement> => {
  const location = await get<string>('location');

  return (
    <>
      <Image
        src={Avatar}
        alt=""
        width={96}
        height={96}
        className="m-0 block h-12 w-12 rounded-full object-cover"
        quality={100}
        loading="eager"
        priority
      />
      <h1 className="text-3xl leading-tight tracking-tight sm:text-4xl">
        Hello, I’m Hayden Bleasel. I’m an Australian Design Engineer currently
        based in {location}.
      </h1>
      <Newsletter />
      <div className="prose-img:m-0 prose-p:m-0 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <Suspense
            fallback={<Skeleton className="w-full rounded-2xl h-[222px]" />}
          >
            <GitHubCard />
          </Suspense>
        </div>
        <Suspense
          fallback={<Skeleton className="w-full rounded-2xl h-[222px]" />}
        >
          <AnnouncementCard />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="w-full rounded-2xl h-[218px]" />}
        >
          <SpotifyCard />
        </Suspense>
        <div className="md:col-span-2">
          <Suspense
            fallback={<Skeleton className="w-full rounded-2xl h-[218px]" />}
          >
            <SteamCard />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Home;
