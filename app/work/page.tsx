import { Link } from '@/components/link';
import work from '@/data/work.json';
import clients from '@/data/clients.json';
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

const Work: FC = () => (
  <main className="px-4 py-16 sm:py-32">
    <div className="space-y-12 prose prose-neutral prose-orange mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl m-0">{title}</h1>
        <p className="m-0 text-lg">{description}</p>
      </header>
      <div className="mt-8 grid gap-4">
        {work.map((job) => (
          <Link
            className="flex items-center gap-4 no-underline text-inherit font-normal group transition-colors"
            key={job.company}
            href={job.url}
          >
            <p className="m-0">
              <span className="text-neutral-950 font-medium group-hover:text-orange-500 transition-colors">
                {job.role}
              </span>
              <span className="text-neutral-500 group-hover:text-orange-400 transition-colors">
                , {job.company}
              </span>
            </p>
            <hr className="flex-1 m-0 group-hover:border-orange-400 transition-colors" />
            <p className="m-0 text-sm group-hover:text-orange-400 transition-colors">
              {job.startYear} &mdash; {job.endYear ?? 'Present'}
            </p>
          </Link>
        ))}
      </div>
      <p>
        I've also been fortunate to work with the following amazing companies on
        a contract basis:{' '}
        {new Intl.ListFormat('en', { type: 'conjunction' }).format(clientList)}.
      </p>
    </div>
  </main>
);

export default Work;
