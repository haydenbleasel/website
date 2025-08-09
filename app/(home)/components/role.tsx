import clsx from 'clsx';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

export type Role = {
  company: string;
  title: string;
  logo: StaticImageData;
  className: string;
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
};

export const Role = ({ role }: { role: Role }) => {
  const startLabel =
    typeof role.start === 'string' ? role.start : role.start.label;
  const startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime;

  const endLabel = typeof role.end === 'string' ? role.end : role.end.label;
  const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime;

  return (
    <li className="flex gap-4">
      <div className="relative flex size-10 flex-none items-center justify-center overflow-hidden rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          alt={role.company}
          className={clsx('size-7 rounded-full', role.className)}
          src={role.logo}
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only leading-tight">Company</dt>
        <dd className="w-full flex-none font-medium text-sm text-zinc-900 leading-tight dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only leading-tight">Role</dt>
        <dd className="text-xs text-zinc-500 leading-tight dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only leading-tight">Date</dt>
        <dd className="ml-auto text-xs text-zinc-400 leading-tight dark:text-zinc-500">
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  );
};
