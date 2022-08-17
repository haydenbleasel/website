import type {
  FilledLinkToWebField,
  GroupField,
  KeyTextField,
  LinkField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import type { GetStaticProps } from 'next';
import Image from 'next/future/image';
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
  <Link
    href={docResolver(link)}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-1 flex-col gap-1 py-2 no-underline sm:flex-row sm:justify-between sm:gap-8"
  >
    <span className="flex flex-1 items-center gap-2">
      {link.link_type === 'Web' && (
        <Image
          width={24}
          height={24}
          src={`https://logo.clearbit.com/${
            new URL((link as FilledLinkToWebField).url).hostname
          }?size=64`}
          className="m-0 rounded-sm"
        />
      )}
      <span className="line-clamp-1">{name}</span>
      <ArrowUpRight className="shrink-0" size={16} />
    </span>
    <span className="shrink-0 text-sm text-neutral-500 dark:text-neutral-400 sm:text-right">
      {description}
    </span>
  </Link>
);

const sortAlphabetically = (
  recommendationA: RecommendationData,
  recommendationB: RecommendationData
) => ((recommendationB.name ?? '') > (recommendationA.name ?? '') ? -1 : 1);

const Recommendations: FC<RecommendationsData> = ({ data }) => (
  <Layout title={data.title} description={data.description}>
    <p className="animate-enter opacity-0 animation-delay-100">
      {data.description}
    </p>
    <List
      className="mt-4"
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
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'recommendations'
  )) as PrismicDocumentWithUID;

  return {
    props: {
      data,
    },
  };
};

export default Recommendations;
