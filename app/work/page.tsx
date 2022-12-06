import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import groupBy from 'lodash.groupby';
import { allWorkPosts } from '@/.contentlayer/generated';
import Divider from '@/components/divider';
import getJellypepperClients from '@/lib/jellypepper';
import formatList from '@/lib/formatList';

const years = groupBy(allWorkPosts, (post) => post.endYear ?? 'Present');

const Role: FC<typeof allWorkPosts[number]> = ({ company, role, slug }) => (
  <Link
    href={slug}
    className="flex flex-col items-center gap-2 py-2 no-underline sm:flex-row sm:gap-8"
  >
    <span className="flex-0 flex items-center gap-2">
      {role} at {company}
    </span>
  </Link>
);

const Year = (year: string, index: number) => (
  <div className="grid" key={year}>
    {index > 0 && <Divider />}
    <div className="flex gap-8">
      <p className="flex-0 m-0 w-24 text-sm leading-9 text-neutral-500 dark:text-neutral-400">
        {year}
      </p>
      <div className="flex flex-1 flex-col">{years[year].map(Role)}</div>
    </div>
  </div>
);

const Work = async (): Promise<ReactNode> => {
  const jellypepper = await getJellypepperClients();
  let clients = jellypepper.map(({ name }) => name);

  clients.push('Tyro');
  clients.push('Nike', 'Google', 'Australian Ethical', 'Timberland', 'Toyota');

  clients = clients.sort((clientA: string, clientB: string) =>
    clientA.localeCompare(clientB)
  );

  return (
    <main className="relative flex flex-col gap-6">
      <h1>Work</h1>
      <div className="mt-4 flex flex-col">
        {Object.keys(years).reverse().map(Year)}
      </div>
      <div className="grid">
        <h2>All clients</h2>
        {formatList(clients)}.
      </div>
    </main>
  );
};

export default Work;
