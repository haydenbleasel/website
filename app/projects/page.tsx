import { basehub } from 'basehub';
import { Apps } from './components/apps';
import { Hero } from './components/hero';

export const generateMetadata = async () => {
  const { projects } = await basehub({ cache: 'no-store' }).query({
    projects: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: projects.metadata.title,
    description: projects.metadata.description,
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
