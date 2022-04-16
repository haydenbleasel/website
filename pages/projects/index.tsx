import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { Fragment } from 'react';
import type {
  EmbedField,
  GroupField,
  ImageFieldImage,
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
  SliceZone,
} from '@prismicio/types';
import { PrismicLink } from '@prismicio/react';
import Link from 'next/link';
import { docResolver, getPage, getPages } from '../../utils/prismic';
import Divider from '../../components/divider';
import Layout from '../../components/layout';

type ProjectsProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    wip: GroupField<{
      name: KeyTextField;
      description: KeyTextField;
      link: LinkField;
    }>;
  };
  projects: ProjectProps[];
};

type ProjectProps = PrismicDocumentWithUID<{
  title: KeyTextField;
  description: KeyTextField;
  coverImage: ImageFieldImage;
  coverVideo: EmbedField;
  slices1: SliceZone;
}>;

const Project: FC<{ title: KeyTextField; description: KeyTextField }> = ({
  title,
  description,
}) => (
  <div className="flex flex-col gap-2 py-2 sm:flex-row sm:gap-8">
    <p className="flex-0 flex w-32 items-center gap-2 text-md text-gray-900 dark:text-white">
      {title}
    </p>
    <p className="flex-1 text-sm text-gray-500 dark:text-gray-400 sm:text-right">
      {description}
    </p>
  </div>
);

const Projects: FC<ProjectsProps> = ({ data, projects }) => (
  <Layout title={data.title} description={data.description}>
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {data.description}
      </p>
      <div className="group mt-4">
        {projects.map((item, index) => (
          <Fragment key={index}>
            {Boolean(index) && <Divider />}
            <div className="transition-opacity group-hover:opacity-30 group-hover:hover:opacity-100">
              <PrismicLink document={item}>
                <Project
                  title={item.data.title}
                  description={item.data.description}
                />
              </PrismicLink>
            </div>
          </Fragment>
        ))}
        {data.wip.map((item, index) => (
          <Fragment key={index}>
            {Boolean(index) && <Divider />}
            <div className="transition-opacity group-hover:opacity-30 group-hover:hover:opacity-100">
              {item.link.link_type === 'Any' ? (
                <Project title={item.name} description={item.description} />
              ) : (
                <Link href={docResolver(item.link)} passHref>
                  <a
                    href={docResolver(item.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Project title={item.name} description={item.description} />
                  </a>
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
  const projects = await getPages('project');

  return {
    props: {
      data,
      projects,
    },
  };
};

export default Projects;
