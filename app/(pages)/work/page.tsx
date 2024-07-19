import { Header } from '@/components/header';
import { Link } from '@/components/link';
import clients from '@/data/clients.json';
import work from '@/data/work.json';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Work';
const description = "Companies and clients I've worked with.";

export const metadata: Metadata = {
  title,
  description,
};

const clientList = Object.values(clients)
  .flatMap((client) => client.items)
  .map((client) => client.name)
  .sort();

const Role: FC<{
  readonly role: string;
  readonly company: string;
  readonly startYear: number;
  readonly endYear?: number;
  readonly url: string;
}> = ({ role, company, startYear, endYear, url }) => (
  <Link
    className="group flex flex-col gap-1 font-normal text-inherit no-underline transition-colors sm:flex-row sm:items-center sm:gap-4 sm:truncate"
    key={company}
    href={url}
  >
    <p className="m-0 sm:truncate">
      <span className="font-medium text-neutral-950 transition-colors group-hover:text-orange-500 dark:text-white">
        {role}
      </span>
      <span className="text-neutral-500 transition-colors group-hover:text-orange-400 dark:text-neutral-400">
        , {company}
      </span>
    </p>
    <hr className="m-0 hidden min-w-7 flex-1 transition-colors group-hover:border-orange-400 sm:block" />
    <p className="m-0 text-sm transition-colors group-hover:text-orange-400">
      {startYear} &mdash; {endYear ?? 'Present'}
    </p>
  </Link>
);

const Work: FC = () => (
  <>
    <Header title={title} description={description} />
    <div className="mt-8 grid gap-4">
      {work.map((job) => (
        <Role key={job.company} {...job} />
      ))}
    </div>
    <p>
      I&apos;ve also been fortunate enough to work with the following amazing
      companies on a contract basis:{' '}
      {new Intl.ListFormat('en', { type: 'conjunction' }).format(clientList)}.
    </p>
  </>
);

export default Work;
