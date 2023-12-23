import Image from 'next/image';
import glimpse from 'react-glimpse/server';
import { CalendarIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { Link } from '@/components/link';
import { allWorks } from '@/.contentlayer/generated';
import { createMetadata } from '@/lib/metadata';
import { cn, sortByStartYear } from '@/lib/utils';
import { Container } from '@/components/container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { FC, ReactElement } from 'react';

const title = 'Work';
const description = 'My previous and current roles.';

export const metadata = createMetadata({ title, description, path: '/work' });

const Role = async ({
  data,
}: {
  readonly data: (typeof allWorks)[number];
}): Promise<ReactElement> => {
  const { image } = await glimpse(data.link);

  return (
    <Link
      href={data.slug}
      key={data.company}
      className={cn(
        'no-underline hover:-translate-y-1 transition-transform',
        data.endYear && 'opacity-50'
      )}
    >
      <Card className="not-prose overflow-hidden bg-white dark:bg-zinc-800">
        {image ? (
          <Image
            src={image}
            alt=""
            width={1200}
            height={600}
            unoptimized
            className="aspect-[1200/630] object-cover"
          />
        ) : null}
        <CardHeader>
          <CardTitle className="leading-tight">{data.role}</CardTitle>
          <CardDescription>{data.company}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" />
            {data.startYear} &mdash; {data.endYear ?? 'Present'}
          </span>
          <span className="flex items-center gap-1">
            <PaperPlaneIcon className="w-3 h-3" />
            {data.location}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

const Work: FC = () => (
  <Container wide>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 grid sm:grid-cols-2 gap-8">
      {allWorks.sort(sortByStartYear).map((job) => (
        <Role key={job.slug} data={job} />
      ))}
    </div>
  </Container>
);

export default Work;
