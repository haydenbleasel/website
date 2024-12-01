import { basehub } from 'basehub';
import { Hero } from './components/hero';

export const generateMetadata = async () => {
  const { travel } = await basehub({ cache: 'no-store' }).query({
    travel: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: travel.metadata.title,
    description: travel.metadata.description,
  };
};

const Travel = () => (
  <>
    <Hero />
  </>
);

export default Travel;
