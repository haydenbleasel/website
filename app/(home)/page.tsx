import { basehub } from 'basehub';
import { Currently } from './components/currently';
import { Feature } from './components/feature';
import { Feed } from './components/feed';
import { Hero } from './components/hero';
import { Spotify } from './components/spotify';

export const generateMetadata = async () => {
  const { home } = await basehub({ cache: 'no-store' }).query({
    home: {
      metaTitle: true,
      metaDescription: true,
    },
  });

  return {
    title: home.metaTitle,
    description: home.metaDescription,
  };
};

const Home = () => (
  <>
    <Hero />
    <Currently />
    <Feed />
    <Feature />
    <div className="w-full aspect-[4/1] bg-dashed" />
    <div className="grid grid-cols-2 divide-x">
      <Spotify />
      <div />
    </div>
  </>
);

export default Home;
