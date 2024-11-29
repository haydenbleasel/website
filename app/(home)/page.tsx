import type { Metadata } from 'next';
import { Currently } from './components/currently';
import { Hero } from './components/hero';

export const metadata: Metadata = {
  title: 'Hayden Bleasel',
  description:
    'Australian Design Engineer currently based in Delray Beach, Florida.',
};

const Home = () => (
  <>
    <Hero />
    <Currently />
  </>
);

export default Home;
