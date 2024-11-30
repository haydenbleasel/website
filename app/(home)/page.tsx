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
    <FeaturedNews />
    <FeaturedTweet />
    <GitHubActivity />
    <div className="grid grid-cols-2 divide-x">
      <Spotify />
      <Steam />
    </div>
  </>
);

export default Home;
