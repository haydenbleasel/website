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
  <div className="flex flex-1 flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
    <div className="flex flex-col gap-1">
      <p className="flex flex-1 items-center gap-2 text-md leading-snug text-gray-900 dark:text-white">
        <span className="line-clamp-1">{name}</span>
        {withArrow && <ArrowUpRight className="shrink-0" size={16} />}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{source}</p>
    </div>
    <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400 sm:text-right">
      {date && format(parse(date, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy')}
    </p>
  </div>
);

const Feature: FC<FeatureData> = ({ link, ...props }) => (
  <div className="fill-anchor">
    {link.link_type === 'Any' ? (
      <FeatureInner {...props} />
    ) : (
      <Link href={docResolver(link)} passHref>
        <a href={docResolver(link)} target="_blank" rel="noopener noreferrer">
          <FeatureInner {...props} withArrow />
        </a>
      </Link>
    )}
  </div>
);

const sortByDate = (featureA: FeatureData, featureB: FeatureData) =>
  (featureB.date ?? '') > (featureA.date ?? '') ? 1 : -1;

const Featured: FC<FeaturesData> = ({ data }) => (
  <Layout title={data.title} description={data.description}>
    <div className="flex flex-col gap-4">
      <p className="animate-enter text-sm text-gray-500 opacity-0 animation-delay-100 dark:text-gray-400">
        {data.description}
      </p>
      <div className="mt-4">
        <List
          data={[
            { title: 'Speaking', items: data.speaking.sort(sortByDate) },
            { title: 'Articles', items: data.articles.sort(sortByDate) },
          ]}
          renderItem={Feature}
          indexKey="name"
          searchKeys={['name', 'description']}
        />
      </div>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('featured')) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Featured;
