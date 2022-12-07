import type { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type ProjectProps = {
  title: string;
  description: string;
  href?: string;
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
            'rounded-full px-2 text-sm font-medium',
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
      className="grid items-center py-2 no-underline sm:grid-cols-3 sm:gap-4"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProjectInner {...props} />
    </Link>
  ) : (
    <div className="grid items-center py-2 no-underline sm:grid-cols-3 sm:gap-4">
      <ProjectInner {...props} />
    </div>
  );

export default Project;
