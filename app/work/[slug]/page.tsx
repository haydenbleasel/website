import { notFound } from 'next/navigation';
import { CalendarIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { allWorks } from '@contentlayer/generated';
import { createMetadata } from '@/lib/metadata';
import { Mdx } from '@/components/mdx';
import { Container } from '@/components/container';
import type { FC } from 'react';
import type { Metadata } from 'next';

type WorkPageProps = {
  readonly params: {
    slug: string;
  };
};

export const generateMetadata = ({ params }: WorkPageProps): Metadata => {
  const currentPath = params.slug;
  const job = allWorks.find(({ slugAsParams }) => slugAsParams === currentPath);

  if (!job) {
    return {};
  }

  return createMetadata({
    title: `${job.role} at ${job.company}`,
    description: `I worked at ${job.company} as a ${job.role} from ${
      job.startYear
    } to ${job.endYear ?? 'Present'}.`,
    path: job.slug,
  });
};

export const generateStaticParams = (): WorkPageProps['params'][] =>
  allWorks.map((job) => ({
    slug: job.slug,
  }));

const WorkPage: FC<WorkPageProps> = ({ params }) => {
  const currentPath = params.slug;
  const job = allWorks.find(({ slugAsParams }) => slugAsParams === currentPath);

  if (!job) {
    notFound();
  }

  const images: string[] = [];

  if (job.image) {
    const imageUrl = new URL(job.image, process.env.NEXT_PUBLIC_SITE_URL).href;
    images.push(imageUrl);
  }

  return (
    <Container>
      <h1 className="mb-0">{job.role}</h1>
      <h1 className="text-zinc-500 dark:text-zinc-400">{job.company}</h1>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          <CalendarIcon className="w-4 h-4" />
          <span className="font-medium">
            {job.startYear} &mdash; {job.endYear ?? 'Present'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          <PaperPlaneIcon className="w-4 h-4" />
          <span className="font-medium">{job.location}</span>
        </div>
      </div>
      <div className="mt-8">
        <Mdx code={job.body.code} />
      </div>
    </Container>
  );
};

export default WorkPage;
