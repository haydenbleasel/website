import { Skeleton } from '@/components/skeleton';
import { get } from '@vercel/edge-config';
import type { Metadata } from 'next';
import Image from 'next/image';
import { type FC, Suspense } from 'react';
import Avatar from './avatar.jpg';
import { AnnouncementCard } from './cards/announcement';
import GitHubCard from './cards/github';
import SpotifyCard from './cards/spotify';
import SteamCard from './cards/steam';
import TypefullyCard from './cards/typefully';
import { Location } from './components/location';
import { Newsletter } from './components/newsletter';

export const generateMetadata = async (): Promise<Metadata> => {
  const location = await get<string>('location');

  return {
    title: 'Hayden Bleasel | Design Engineer',
    description: `I’m currently the Chief Product Officer at Corellium and the founder of Eververse. Currently based in ${location}.`,
  };
};

const Home: FC = () => (
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
    <h1 className="text-3xl leading-tight tracking-[-0.045em] sm:text-4xl">
      Hello, I’m Hayden Bleasel. I’m an Australian Design Engineer currently
      based in{' '}
      <Suspense
        fallback={
          <Skeleton className="inline-block h-8 w-[300px] translate-y-1" />
        }
      >
        <Location />
      </Suspense>
      .
    </h1>
    <Newsletter />
    <div className="prose-img:m-0 prose-p:m-0 grid gap-3 md:grid-cols-3">
      <div className="md:col-span-2">
        <Suspense
          fallback={<Skeleton className="h-[222px] w-full rounded-2xl" />}
        >
          <GitHubCard />
        </Suspense>
      </div>
      <Suspense
        fallback={<Skeleton className="h-[222px] w-full rounded-2xl" />}
      >
        <AnnouncementCard />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="h-[218px] w-full rounded-2xl" />}
      >
        <SpotifyCard />
      </Suspense>
      <div className="md:col-span-2">
        <Suspense
          fallback={<Skeleton className="h-[218px] w-full rounded-2xl" />}
        >
          <SteamCard />
        </Suspense>
      </div>
      <div className="md:col-span-3">
        <TypefullyCard />
      </div>
    </div>
  </>
);

export default Home;
