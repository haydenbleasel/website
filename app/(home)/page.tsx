import { Section } from '@/components/section';
import { basehub } from 'basehub';
import { Currently } from './components/currently';
import { FeaturedNews } from './components/featured-news';
import { FeaturedTweet } from './components/featured-tweet';
import { Feed } from './components/feed';
import { GitHubActivity } from './components/github-activity';
import { Hero } from './components/hero';
import { Spotify } from './components/spotify';
import { Steam } from './components/steam';

export const generateMetadata = async () => {
  const { home } = await basehub({ cache: 'no-store' }).query({
    home: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: home.metadata.title,
    description: home.metadata.description,
  };
};

const Home = () => (
  <>
    <Hero />
    <Currently />
    <Feed />
    <FeaturedNews />
    <FeaturedTweet />
    <GitHubActivity />
    <Section className="grid grid-cols-2 divide-x">
      <div className="p-4">
        <Spotify />
      </div>
      <div className="p-4">
        <Steam />
      </div>
    </Section>
  </>
);

export default Home;
