import { Newsletter } from './components/newsletter';
import { Hero } from './components/hero';
import GitHubCard from './cards/github';
import { AnnouncementCard } from './cards/announcement';
import SpotifyCard from './cards/spotify';
import SteamCard from './cards/steam';
import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'Hayden Bleasel',
  description:
    'I’m an Australian Product Designer and Software Engineer currently based in Delray Beach, Florida. I’m currently the Chief Product Officer at Corellium and the founder of Eververse.',
};

const Home: FC = () => (
  <>
    <Hero />
    <Newsletter />
    <div className="grid grid-cols-3 gap-3">
      <GitHubCard />
      <AnnouncementCard />
      <SpotifyCard />
      <SteamCard />
    </div>
  </>
);

export default Home;
