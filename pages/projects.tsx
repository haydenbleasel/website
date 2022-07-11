import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { Fragment } from 'react';
import type {
  GroupField,
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import Link from 'next/link';
import { docResolver, getPage } from '../utils/prismic';
import Divider from '../components/divider';
import Layout from '../components/layout';

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

const Project: FC<{
  title: KeyTextField;
  description: KeyTextField;
  wip?: boolean;
}> = ({ title, description, wip = false }) => (
  <div className="flex flex-col gap-2 py-2 sm:flex-row sm:gap-8">
    <p className="flex-0 flex items-center gap-2 text-md text-gray-900 dark:text-white">
      {title}
      {wip && (
        <span className="text-xs text-gray-500 dark:text-gray-400">(WIP)</span>
      )}
    </p>
    <p className="flex-1 text-sm text-gray-500 dark:text-gray-400 sm:text-right">
      {description}
    </p>
  </div>
);

const Projects: FC<ProjectsProps> = ({ data }) => (
  <Layout title={data.title} description={data.description}>
    <div className="flex flex-col gap-4">
      <p className="animate-enter text-sm text-gray-500 opacity-0 animation-delay-100 dark:text-gray-400">
        {data.description}
      </p>
      <div className="group mt-4">
        {data.wip.map((item, index) => (
          <Fragment key={index}>
            {Boolean(index) && <Divider />}
            <div
              className="animate-enter opacity-0 transition-opacity group-hover:opacity-30 group-hover:hover:opacity-100"
              style={{
                animationDelay: `${(index + data.wip.length + 2) * 100}ms`,
              }}
            >
              {item.link.link_type === 'Any' ? (
                <Project title={item.name} description={item.description} wip />
              ) : (
                <Link
                  href={docResolver(item.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Project title={item.name} description={item.description} />
                </Link>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('projects')) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Projects;
