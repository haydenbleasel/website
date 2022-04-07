import type {
  GroupField,
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';
import Layout from '../components/layout';
import List from '../components/list';
import { docResolver, getPage } from '../utils/prismic';

type RecommendationsData = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    tools: GroupField<RecommendationData>;
    freelancers: GroupField<RecommendationData>;
  };
};

type RecommendationData = {
  name: KeyTextField;
  description: KeyTextField;
  link: LinkField;
};

const Recommendation: FC<RecommendationData> = ({
  name,
  description,
  link,
}) => (
  <div className="fill-anchor">
    <Link href={docResolver(link)} passHref>
      <a href={docResolver(link)} target="_blank" rel="noopener noreferrer">
        <div className="flex flex-1 flex-col gap-1 py-2 sm:flex-row sm:justify-between sm:gap-8">
          <p className="flex flex-1 items-center gap-2 text-md leading-snug text-gray-900 dark:text-white">
            <span className="line-clamp-1">{name}</span>
            <ArrowUpRight className="shrink-0" size={16} />
          </p>
          <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400 sm:text-right">
            {description}
          </p>
        </div>
      </a>
    </Link>
  </div>
);

const sortAlphabetically = (
  recommendationA: RecommendationData,
  recommendationB: RecommendationData
) => ((recommendationB.name ?? '') > (recommendationA.name ?? '') ? -1 : 1);

const Recommendations: FC<RecommendationsData> = ({ data }) => (
  <Layout title={data.title} description={data.description}>
    <div className="mt-4">
      <List
        data={[
          { title: 'Tools', items: data.tools.sort(sortAlphabetically) },
          {
            title: 'Freelancers',
            items: data.freelancers.sort(sortAlphabetically),
          },
        ]}
        renderItem={Recommendation}
        indexKey="name"
        searchKeys={['name', 'description']}
      />
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('recommendations')) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Recommendations;
