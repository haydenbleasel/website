import { basehub } from 'basehub';
import { Apps } from './components/apps';
import { Hero } from './components/hero';

export const generateMetadata = async () => {
  const { projects } = await basehub({ cache: 'no-store' }).query({
    projects: {
      metaTitle: true,
      metaDescription: true,
    },
  });

  return {
    title: projects.metaTitle,
    description: projects.metaDescription,
  };
};

const Projects = () => {
  return (
    <>
      <Hero />
      <Apps />
    </>
  );
};

export default Projects;
