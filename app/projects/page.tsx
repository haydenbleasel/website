import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import clsx from 'clsx';
import Divider from '@/components/divider';
import { getNPMPackages } from '@/lib/npm';
import projects from '@/content/projects.json';

type ProjectProps = {
  title: string;
  description: string;
  href: string;
  wip?: boolean;
};

const ProjectInner: FC<Partial<ProjectProps>> = ({
  title,
  description,
  wip,
}) => (
  <>
    <span className="flex-0 flex items-center gap-2">
      <span className="font-medium text-zinc-900 dark:text-white">{title}</span>
      {wip && (
        <span
          className={clsx(
            'rounded-full px-2 text-sm',
            'bg-zinc-100 text-zinc-500',
            'dark:bg-zinc-800 dark:text-zinc-400'
          )}
        >
          WIP
        </span>
      )}
    </span>
    <span className="col-span-2 flex-1 text-sm font-light text-zinc-500 line-clamp-1 dark:text-zinc-400 sm:text-right">
      {description}
    </span>
  </>
);

const Project: FC<ProjectProps> = ({ href, ...props }) =>
  href ? (
    <Link
      href={href}
      className="grid grid-cols-3 items-center gap-4 py-2 no-underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProjectInner {...props} />
    </Link>
  ) : (
    <div className="grid grid-cols-3 items-center gap-4 py-2 no-underline">
      <ProjectInner {...props} />
    </div>
  );

const Projects = async (): Promise<ReactNode> => {
  const packages = await getNPMPackages();

  return (
    <main className="flex flex-col gap-6 prose-h2:mb-2 prose-h2:mt-4 prose-p:m-0">
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
