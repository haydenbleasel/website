import { basehub } from 'basehub';
import { Apps } from './components/apps';
import { Attribution } from './components/attribution';
import { Hero } from './components/hero';

export const generateMetadata = async () => {
  const { stack } = await basehub({ cache: 'no-store' }).query({
    stack: {
      metaTitle: true,
      metaDescription: true,
    },
  });

  return {
    title: stack.metaTitle,
    description: stack.metaDescription,
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
