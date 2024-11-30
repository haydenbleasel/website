import { basehub } from 'basehub';
import { Hero } from './components/hero';
import { Recommendations } from './components/recommendations';
import { Roles } from './components/roles';

export const generateMetadata = async () => {
  const { work } = await basehub({ cache: 'no-store' }).query({
    work: {
      metaTitle: true,
      metaDescription: true,
    },
  });

  return {
    title: work.metaTitle,
    description: work.metaDescription,
  };
};

const Work = () => (
  <>
    <Hero />
    <Roles />
    <div className="h-4 bg-dashed" />
    <Recommendations />
  </>
);

export default Work;
