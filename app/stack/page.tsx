import { basehub } from 'basehub';
import { Apps } from './components/apps';
import { Attribution } from './components/attribution';
import { Hero } from './components/hero';

export const generateMetadata = async () => {
  const { stack } = await basehub().query({
    stack: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: stack.metadata.title,
    description: stack.metadata.description,
  };
};

const Stack = () => (
  <>
    <Hero />
    <Apps />
    <Attribution />
  </>
);

export default Stack;
