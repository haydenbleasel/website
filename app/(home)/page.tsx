import { basehub } from 'basehub';
import { Currently } from './components/currently';
import { Hero } from './components/hero';

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
  </>
);

export default Home;
