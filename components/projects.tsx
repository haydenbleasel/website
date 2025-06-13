import { projects } from '@/lib/projects';
import Link from 'next/link';

export const Projects = () => (
  <ul className="list-disc pl-5">
    {projects.map((project) => (
      <li key={project.name}>
        <Link href={project.link}>{project.name}</Link> - {project.description}
      </li>
    ))}
  </ul>
);
