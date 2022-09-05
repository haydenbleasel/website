import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  GroupField,
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import Link from 'next/link';
import { docResolver, getPage } from '../utils/prismic';
import Layout from '../components/layout';
import List from '../components/list';

export type ProjectsProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    wip: GroupField<{
      name: KeyTextField;
      description: KeyTextField;
      link: LinkField;
    }>;
  };
};

type ProjectProps = {
  title: KeyTextField;
  description: KeyTextField;
  wip?: boolean;
};

const Project: FC<ProjectProps> = ({ title, description, wip = false }) => (
  <div className="flex flex-col gap-2 py-2 sm:flex-row sm:gap-8">
    <span className="flex-0 flex items-center gap-2">
      {title}
      {wip && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          (WIP)
        </span>
      )}
    </span>
    <span className="flex-1 text-sm text-neutral-500 dark:text-neutral-400 sm:text-right">
      {description}
    </span>
  </div>
);

const Projects: FC<ProjectsProps> = ({ data }) => (
  <Layout
    title={data.title}
    description={data.description}
    subtitle={data.description}
  >
    <List
      className="mt-4"
      data={[
        { title: 'All', items: data.wip },
        {
          title: 'Launched',
          items: data.wip.filter((item) => item.link.link_type !== 'Any'),
        },
        {
          title: 'In Progress',
          items: data.wip.filter((item) => item.link.link_type === 'Any'),
        },
      ]}
      renderItem={(item: ProjectsProps['data']['wip'][number]) =>
        item.link.link_type === 'Any' ? (
          <Project title={item.name} description={item.description} wip />
        ) : (
          <Link
            href={docResolver(item.link)}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Project title={item.name} description={item.description} />
          </Link>
        )
      }
      indexKey="title"
      searchKeys={['title', 'date', 'content']}
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'projects'
  )) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Projects;
