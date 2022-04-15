import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { Fragment } from 'react';
import type {
  EmbedField,
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
  SliceZone,
} from '@prismicio/types';
import { PrismicLink } from '@prismicio/react';
import { getPage, getPages } from '../../utils/prismic';
import Divider from '../../components/divider';
import Layout from '../../components/layout';

type ProjectsProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
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

const Project = (project: ProjectProps) => {
  const { id, data } = project;

  return (
    <PrismicLink document={project} key={id}>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 py-2">
        <p className="flex-0 flex w-24 items-center gap-2 text-md text-gray-900 dark:text-white">
          {data.title}
        </p>
        <p className="flex-1 sm:text-right text-sm text-gray-500 dark:text-gray-400">
          {data.description}
        </p>
      </div>
    </PrismicLink>
  );
};

const Projects: FC<ProjectsProps> = ({ data, projects }) => (
  <Layout title={data.title} description={data.description}>
    <div className="group mt-4">
      {projects.map((item, index) => (
        <Fragment key={index}>
          {Boolean(index) && <Divider />}
          <div className="transition-opacity group-hover:opacity-30 group-hover:hover:opacity-100">
            <Project {...item} />
          </div>
        </Fragment>
      ))}
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
