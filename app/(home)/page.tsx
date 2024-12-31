import { Section } from '@/components/section';
import { basehub } from '@/lib/basehub';
import { Currently } from './components/currently';
import { FeaturedNews } from './components/featured-news';
import { FeaturedTweet } from './components/featured-tweet';
import { FeaturedVideo } from './components/featured-video';
import { Feed } from './components/feed';
import { GitHubActivity } from './components/github-activity';
import { Hero } from './components/hero';
import { Spotify } from './components/spotify';
import { Steam } from './components/steam';

export const generateMetadata = async () => {
  const { home } = await basehub.query({
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
    <FeaturedVideo />
    <GitHubActivity />
    <Section className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
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
