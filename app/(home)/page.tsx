import { basehub } from 'basehub';
import { Currently } from './components/currently';
import { Feature } from './components/feature';
import { Feed } from './components/feed';
import { GitHubActivity } from './components/github-activity';
import { Hero } from './components/hero';
import { Spotify } from './components/spotify';
import { Steam } from './components/steam';

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
    <GitHubActivity />
    <div className="grid grid-cols-2 divide-x">
      <Spotify />
      <Steam />
    </div>
  </>
);

export default Home;
