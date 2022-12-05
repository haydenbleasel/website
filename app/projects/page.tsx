import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import Divider from '@/components/divider';
import { getNPMPackages } from '@/lib/npm';
import projects from '@/content/projects.json';

type ProjectProps = {
  title: string;
  description: string;
  href: string;
  wip?: boolean;
};

const Project: FC<ProjectProps> = ({
  title,
  href,
  description,
  wip = false,
}) => (
  <Link
    href={href}
    className="no-underline py-2 grid grid-cols-3 gap-4"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="flex-0 flex items-center gap-2">
      {title}
      {wip && (
        <span className="text-sm text-gray-500 bg-gray-100 px-2 rounded-full">
          WIP
        </span>
      )}
    </span>
    <span className="truncate font-light flex-1 text-gray-500 dark:text-gray-400 col-span-2 sm:text-right">
      {description}
    </span>
  </Link>
);

const Projects = async (): Promise<ReactNode> => {
  const packages = await getNPMPackages();

  return (
    <main className="flex flex-col gap-6 prose-p:m-0 prose-h2:mb-2 prose-h2:mt-4">
      <h1>Projects</h1>
      <div className="flex flex-col gap-2">
        <h2>Apps</h2>
        <div>
          {projects.map((project, index) => (
            <Fragment key={project.href}>
              {index > 0 && <Divider />}
              <Project {...project} />
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2>Open Source</h2>
        <div>
          {packages.map((pkg, index) => (
            <Fragment key={pkg.name}>
              {index > 0 && <Divider />}
              <Project
                title={pkg.name.replace('@haydenbleasel/', '')}
                description={pkg.description}
                href={pkg.link}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <p className="m-0">
        I also started some open-source libraries that have hundreds or
        thousands of stars, such as{' '}
        <Link href="https://github.com/itgalaxy/favicons">Favicons</Link> and{' '}
        <Link href="https://github.com/nitinthewiz/ghost-phantom">Phantom</Link>
        .
      </p>
    </main>
  );
};

export default Projects;
