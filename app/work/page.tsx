import { basehub } from '@/lib/basehub';
import { Clients } from './components/clients';
import { Hero } from './components/hero';
import { Recommendations } from './components/recommendations';
import { Roles } from './components/roles';

export const generateMetadata = async () => {
  const { work } = await basehub.query({
    work: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: work.metadata.title,
    description: work.metadata.description,
  };
};

const Work = () => (
  <>
    <Hero />
    <Roles />
    <Clients />
    <Recommendations />
  </>
);

export default Work;
