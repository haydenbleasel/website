import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { Fragment } from 'react';
import { ArrowUpRight } from 'react-feather';
import type {
  EmbedField,
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
  SliceZone,
} from '@prismicio/types';
import { PrismicLink } from '@prismicio/react';
import { getPages } from '../../utils/prismic';
import Divider from '../../components/divider';
import Layout from '../../components/layout';

type ProjectsProps = {
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
      <div className="flex gap-8 py-2">
        <p className="flex-0 flex w-24 items-center gap-2 text-md text-gray-900 dark:text-white">
          <span>{data.title}</span>
          <ArrowUpRight size={16} />
        </p>
        <p className="flex-1 text-right text-sm text-gray-400 dark:text-gray-500">
          {data.description}
        </p>
      </div>
    </PrismicLink>
  );
};

const Projects: FC<ProjectsProps> = ({ projects }) => (
  <Layout title="Projects" description="Things I'm working on after-hours.">
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
  const projects = await getPages('project');

  return {
    props: {
      projects,
    },
  };
};

export default Projects;
