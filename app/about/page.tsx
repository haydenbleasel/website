import { basehub } from '@/lib/basehub';
import { Books } from './components/books';
import { Content } from './components/content';
import { Hero } from './components/hero';

export const generateMetadata = async () => {
  const { about } = await basehub.query({
    about: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: about.metadata.title,
    description: about.metadata.description,
  };
};

const About = () => (
  <>
    <Hero />
    <Content />
    <Books />
  </>
);

export default About;
