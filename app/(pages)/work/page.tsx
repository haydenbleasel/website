import { Link } from '@/components/link';
import work from '@/data/work.json';
import clients from '@/data/clients.json';
import { Header } from '@/components/header';
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
    className="sm:truncate flex items-center gap-4 no-underline text-inherit font-normal group transition-colors"
    key={company}
    href={url}
  >
    <p className="m-0 sm:truncate">
      <span className="text-neutral-950 dark:text-white font-medium group-hover:text-orange-500 transition-colors">
        {role}
      </span>
      <span className="text-neutral-500 dark:text-neutral-400 group-hover:text-orange-400 transition-colors">
        , {company}
      </span>
    </p>
    <hr className="hidden sm:block min-w-7 flex-1 m-0 group-hover:border-orange-400 transition-colors" />
    <p className="hidden sm:block m-0 text-sm group-hover:text-orange-400 transition-colors">
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
      I&apos;ve also been fortunate to work with the following amazing companies
      on a contract basis:{' '}
      {new Intl.ListFormat('en', { type: 'conjunction' }).format(clientList)}.
    </p>
  </>
);

export default Work;
