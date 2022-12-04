import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import Divider from '@/components/divider';
import { getNPMPackages } from '@/lib/npm';

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
    className="no-underline flex flex-col gap-2 py-2 sm:flex-row sm:gap-8"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="flex-0 text-sm flex items-center gap-2">
      {title}
      {wip && (
        <span className="text-xs text-gray-500 bg-gray-100 px-1 rounded-full">
          WIP
        </span>
      )}
    </span>
    <span className="truncate font-light flex-1 text-sm text-gray-500 dark:text-gray-400 sm:text-right">
      {description}
    </span>
  </Link>
);

const projects = [
  {
    title: 'Neutral',
    href: 'https://tryneutral.com/',
    description: 'Join the carbon neutral community.',
  },
  {
    title: 'Neutral API',
    href: '#',
    description: 'Planetary reforestation at scale.',
    wip: true,
  },
  {
    title: 'Hancock',
    description: 'A simple email signature generator.',
    href: 'https://hancock.haydenbleasel.com/',
  },
  {
    title: 'San Andreas Radio',
    description: 'All you had to do was follow the damn train, CJ!',
    href: 'https://sanandreasradio.com/',
  },
  {
    title: 'Bokeh',
    description: 'The new home for photographers.',
    href: 'https://www.bokeh.photo/',
  },
  {
    title: 'Vercel for VS Code',
    description: 'A VS Code extension for Vercel deployment status.',
    href: 'https://marketplace.visualstudio.com/items?itemName=haydenbleasel.vercel-vscode',
  },
];

const Projects = async (): Promise<ReactNode> => {
  const packages = await getNPMPackages();

  return (
    <main className="flex flex-col gap-6">
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
      <p>
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
