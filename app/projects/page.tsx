import type { FC } from 'react';
import { Fragment } from 'react';
import Project from './project';
import Divider from '@/components/divider';
import projects from '@/content/projects.json';

const Projects: FC = () => (
  <main className="flex flex-col gap-6 prose-h2:mb-2 prose-h2:mt-4 prose-p:m-0">
    <h1>Projects</h1>
    {projects.map((project, index) => (
      <Fragment key={project.title}>
        {index > 0 && <Divider />}
        <Project {...project} />
      </Fragment>
    ))}
  </main>
);

export default Projects;
