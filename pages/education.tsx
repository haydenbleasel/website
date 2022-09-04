import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  GroupField,
  KeyTextField,
  LinkField,
  NumberField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import Link from 'next/link';
import { docResolver, getPage } from '../utils/prismic';
import Layout from '../components/layout';
import List from '../components/list';

type CourseProps = GroupField<{
  name: KeyTextField;
  institution: KeyTextField;
  year: NumberField;
  certificate: LinkField;
}>;

export type EducationProps = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    university: CourseProps;
    online: CourseProps;
  };
};

const Course: FC<CourseProps[number]> = ({ name, institution, year }) => (
  <div className="flex flex-col gap-2 py-2 sm:flex-row sm:gap-8">
    <span className="flex-0 flex flex-col">
      {name}
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        {institution}
      </span>
    </span>
    <span className="flex-1 text-sm text-neutral-500 dark:text-neutral-400 sm:text-right">
      {year}
    </span>
  </div>
);

const soryByYear = (
  courseA: CourseProps[number],
  courseB: CourseProps[number]
) => {
  if (!courseA.year || !courseB.year) {
    return 0;
  }

  return courseB.year - courseA.year;
};

const Education: FC<EducationProps> = ({ data }) => (
  <Layout
    title={data.title}
    description={data.description}
    subtitle={data.description}
  >
    <List
      className="mt-4"
      data={[
        {
          title: 'All',
          items: [...data.university, ...data.online].sort(soryByYear),
        },
        {
          title: 'University',
          items: data.university.sort(soryByYear),
        },
        {
          title: 'Online',
          items: data.online.sort(soryByYear),
        },
      ]}
      renderItem={(item: CourseProps[number]) =>
        item.certificate.link_type === 'Any' ? (
          <Course {...item} />
        ) : (
          <Link
            href={docResolver(item.certificate)}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Course {...item} />
          </Link>
        )
      }
      indexKey="name"
      searchKeys={['name', 'year', 'institution']}
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'education'
  )) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Education;
