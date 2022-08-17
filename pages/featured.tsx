import type {
  GroupField,
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import { format, parse } from 'date-fns';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';
import Layout from '../components/layout';
import List from '../components/list';
import { docResolver, getPage } from '../utils/prismic';

type FeaturesData = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    speaking: GroupField<FeatureData>;
    articles: GroupField<FeatureData>;
  };
};

type FeatureData = {
  name: KeyTextField;
  source: KeyTextField;
  link: LinkField;
  date: KeyTextField;
};

const FeatureInner: FC<Partial<FeatureData> & { withArrow?: boolean }> = ({
  name,
  source,
  date,
  withArrow,
}) => (
  <span className="flex flex-1 flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
    <span>
      <span className="flex flex-1 items-center gap-2">
        <span className="line-clamp-1">{name}</span>
        {withArrow && <ArrowUpRight className="shrink-0" size={16} />}
      </span>
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        {source}
      </span>
    </span>
    <span className="shrink-0 text-sm text-neutral-500 dark:text-neutral-400 sm:text-right">
      {date && format(parse(date, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy')}
    </span>
  </span>
);

const Feature: FC<FeatureData> = ({ link, ...props }) =>
  link.link_type === 'Any' ? (
    <FeatureInner {...props} />
  ) : (
    <Link
      href={docResolver(link)}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
    >
      <FeatureInner {...props} withArrow />
    </Link>
  );

const sortByDate = (featureA: FeatureData, featureB: FeatureData) =>
  (featureB.date ?? '') > (featureA.date ?? '') ? 1 : -1;

const Featured: FC<FeaturesData> = ({ data }) => (
  <Layout title={data.title} description={data.description}>
    <p className="animate-enter text-neutral-500 opacity-0 animation-delay-100 dark:text-neutral-400">
      {data.description}
    </p>
    <List
      className="mt-4"
      data={[
        { title: 'Speaking', items: data.speaking.sort(sortByDate) },
        { title: 'Articles', items: data.articles.sort(sortByDate) },
      ]}
      renderItem={Feature}
      indexKey="name"
      searchKeys={['name', 'description']}
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'featured'
  )) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Featured;
