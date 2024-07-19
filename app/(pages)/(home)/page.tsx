import type { Metadata } from 'next';
import type { FC } from 'react';
import { AnnouncementCard } from './cards/announcement';
import GitHubCard from './cards/github';
import SpotifyCard from './cards/spotify';
import SteamCard from './cards/steam';
import { Avatar } from './components/avatar';
import { GitHub } from './components/github';
import { Location } from './components/location';
import { Newsletter } from './components/newsletter';
import { Wave } from './components/wave';

export const metadata: Metadata = {
  title: 'Hayden Bleasel',
  description:
    'I’m an Australian Product Designer and Software Engineer currently based in Delray Beach, Florida. I’m currently the Chief Product Officer at Corellium and the founder of Eververse.',
};

const Home: FC = () => (
  <>
    <h1 className="text-3xl leading-tight tracking-tight sm:text-4xl">
      Hello <Wave /> I’m Hayden Bleasel <Avatar />. I’m an Australian 🦘 Product
      Designer 🖼️ and Software Engineer <GitHub /> currently based in{' '}
      <Location />.
    </h1>
    <Newsletter />
    <div className="prose-img:m-0 prose-p:m-0 grid gap-3 md:grid-cols-3">
      <div className="md:col-span-2">
        <GitHubCard />
      </div>
      <AnnouncementCard />
      <SpotifyCard />
      <div className="md:col-span-2">
        <SteamCard />
      </div>
    </div>
  </>
);

export default Home;
